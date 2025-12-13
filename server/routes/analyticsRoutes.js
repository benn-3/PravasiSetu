const express = require('express');
const router = express.Router();
const {
    getMigrationTrends,
    getSkillDistribution,
    getPlatformStats
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');

router.get('/migration', protect, roleCheck(['officer', 'admin']), getMigrationTrends);
router.get('/skills', protect, roleCheck(['officer', 'admin', 'employer']), getSkillDistribution);
router.get('/stats', protect, roleCheck(['admin', 'officer']), getPlatformStats);

module.exports = router;
