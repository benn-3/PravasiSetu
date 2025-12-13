const Worker = require('../models/Worker');
const Job = require('../models/Job');
const Placement = require('../models/Placement');
const User = require('../models/User');

// @desc    Get Migration Trends (Workers by State)
// @route   GET /api/analytics/migration
// @access  Private (Officer/Admin)
const getMigrationTrends = async (req, res) => {
    try {
        const migrationData = await User.aggregate([
            { $match: { role: 'worker' } },
            {
                $group: {
                    _id: "$location.state",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
        res.json(migrationData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Skill Distribution
// @route   GET /api/analytics/skills
// @access  Private (Officer/Admin)
const getSkillDistribution = async (req, res) => {
    try {
        const skillData = await Worker.aggregate([
            { $unwind: "$skills" },
            {
                $group: {
                    _id: "$skills",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
        res.json(skillData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Platform Stats
// @route   GET /api/analytics/stats
// @access  Private (Admin)
const getPlatformStats = async (req, res) => {
    try {
        const workerCount = await User.countDocuments({ role: 'worker' });
        const employerCount = await User.countDocuments({ role: 'employer' });
        const jobCount = await Job.countDocuments({ status: 'open' });
        const placementCount = await Placement.countDocuments({ status: 'hired' });

        res.json({
            workers: workerCount,
            employers: employerCount,
            activeJobs: jobCount,
            placements: placementCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMigrationTrends,
    getSkillDistribution,
    getPlatformStats
};
