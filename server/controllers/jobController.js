const Job = require('../models/Job');
const Placement = require('../models/Placement');
const { matchWorkersToJob } = require('../utils/matchEngine');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Employer)
const createJob = async (req, res) => {
    const { title, description, requiredSkills, location, salary } = req.body;

    try {
        const job = await Job.create({
            employer: req.user.id,
            title,
            description,
            requiredSkills,
            location,
            salary
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all jobs (with optional filtering)
// @route   GET /api/jobs
// @access  Public (or Worker)
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'open' }).populate('employer', 'name');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Employer's Jobs
// @route   GET /api/jobs/my
// @access  Private (Employer)
const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ employer: req.user.id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'name email');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private (Worker)
const applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if already applied
        const existingPlacement = await Placement.findOne({
            job: req.params.id,
            worker: req.workerId // We need to attach workerId in middleware or fetch it
            // Wait, req.user.id is User ID. Worker documents linked to User.
            // We need to resolve Worker ID from User ID.
        });

        // Resolving worker ID
        const Worker = require('../models/Worker');
        const workerProfile = await Worker.findOne({ user: req.user.id });

        if (!workerProfile) {
            return res.status(400).json({ message: 'Worker profile required to apply' });
        }

        const alreadyApplied = await Placement.findOne({
            job: req.params.id,
            worker: workerProfile._id
        });

        if (alreadyApplied) {
            return res.status(400).json({ message: 'Already applied to this job' });
        }

        const placement = await Placement.create({
            job: req.params.id,
            worker: workerProfile._id,
            status: 'applied'
        });

        res.status(201).json(placement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Applicants for a Job
// @route   GET /api/jobs/:id/applicants
// @access  Private (Employer)
const getApplicants = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Authorization check: User must be the employer who posted the job
        if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view applicants for this job' });
        }

        const placements = await Placement.find({ job: req.params.id })
            .populate({
                path: 'worker',
                populate: { path: 'user', select: 'name email' }
            });

        res.json(placements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get Matched Workers for a Job
// @route   GET /api/jobs/:id/matches
// @access  Private (Employer)
const getMatchedWorkers = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Authorization check
        if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view matches for this job' });
        }

        const matches = await matchWorkersToJob(req.params.id);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getMyJobs,
    getJobById,
    applyForJob,
    applyForJob,
    getApplicants,
    getMatchedWorkers
};

