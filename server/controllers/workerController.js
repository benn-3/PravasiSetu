const Worker = require('../models/Worker');
const User = require('../models/User');

// @desc    Create/Update Worker Profile
// @route   POST /api/worker/profile
// @access  Private (Worker)
const updateWorkerProfile = async (req, res) => {
    const { skills, experience, isAvailable, dailyRate } = req.body;

    try {
        const workerFields = {
            user: req.user.id,
            skills,
            experience,
            isAvailable,
            dailyRate
        };

        let worker = await Worker.findOne({ user: req.user.id });

        if (worker) {
            // Update
            worker = await Worker.findOneAndUpdate(
                { user: req.user.id },
                { $set: workerFields },
                { new: true }
            );
        } else {
            // Create
            worker = new Worker(workerFields);
            await worker.save();
        }

        res.json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Current Worker Profile
// @route   GET /api/worker/profile
// @access  Private (Worker)
const getWorkerProfile = async (req, res) => {
    try {
        const worker = await Worker.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

        if (!worker) {
            return res.status(404).json({ message: 'There is no profile for this worker' });
        }

        res.json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Workers (for Employers/Officers)
// @route   GET /api/worker
// @access  Private
const getAllWorkers = async (req, res) => {
    try {
        const workers = await Worker.find().populate('user', ['name', 'email', 'location']);
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify Worker (Officer Only)
// @route   PUT /api/worker/:id/verify
// @access  Private (Officer)
const verifyWorker = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isVerified = true;
        await user.save();

        res.json({ message: 'Worker verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    updateWorkerProfile,
    getWorkerProfile,
    getAllWorkers,
    verifyWorker
};
