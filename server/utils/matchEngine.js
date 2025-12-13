const Worker = require('../models/Worker');
const Job = require('../models/Job');
const { calculateDistance } = require('./geoUtils');

const matchWorkersToJob = async (jobId) => {
    try {
        const job = await Job.findById(jobId);
        if (!job) throw new Error('Job not found');

        const workers = await Worker.find({ isAvailable: true }).populate('user');

        // Simple verification content - in a real app this would be more complex
        const matches = workers.map(worker => {
            let score = 0;

            // 1. Skill Match
            const skillMatchCount = worker.skills.filter(skill =>
                job.requiredSkills.includes(skill)
            ).length;
            score += skillMatchCount * 10;

            // 2. Location Match (if both have location)
            let distance = null;
            if (job.location && job.location.coordinates &&
                worker.user.location && worker.user.location.coordinates) {

                const jobLon = job.location.coordinates[0];
                const jobLat = job.location.coordinates[1];
                const workerLon = worker.user.location.coordinates[0];
                const workerLat = worker.user.location.coordinates[1];

                distance = calculateDistance(jobLat, jobLon, workerLat, workerLon);

                if (distance < 50) score += 20; // Within 50km
                else if (distance < 200) score += 10; // Within 200km
                else score -= 5;
            }

            return {
                worker,
                score,
                distance,
                skillMatchCount
            };
        });

        // Sort by score descending
        matches.sort((a, b) => b.score - a.score);

        return matches;
    } catch (error) {
        console.error(error);
        return [];
    }
};

module.exports = {
    matchWorkersToJob
};
