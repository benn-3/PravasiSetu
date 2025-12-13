
const express = require('express');
const router = express.Router();
const {
    createJob,
    getJobs,
    getMyJobs,
    getJobById,
    applyForJob,
    getApplicants,
    getMatchedWorkers
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');

router.route('/')
    .get(getJobs)
    .post(protect, roleCheck(['employer', 'admin']), createJob);

router.get('/my', protect, roleCheck(['employer']), getMyJobs);

router.route('/:id')
    .get(getJobById);

router.route('/:id/apply')
    .post(protect, roleCheck(['worker']), applyForJob);

router.route('/:id/applicants')
    .get(protect, roleCheck(['employer', 'admin']), getApplicants);

router.route('/:id/matches')
    .get(protect, roleCheck(['employer', 'admin']), getMatchedWorkers);

module.exports = router;
