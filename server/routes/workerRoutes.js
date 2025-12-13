const express = require('express');
const router = express.Router();
const {
    updateWorkerProfile,
    getWorkerProfile,
    getAllWorkers,
    verifyWorker
} = require('../controllers/workerController');
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');

router.get('/profile', protect, roleCheck(['worker']), getWorkerProfile);
router.post('/profile', protect, roleCheck(['worker']), updateWorkerProfile);
router.get('/', protect, getAllWorkers); // Accessible by employers/officers too
router.put('/:id/verify', protect, roleCheck(['officer', 'admin']), verifyWorker);

module.exports = router;
