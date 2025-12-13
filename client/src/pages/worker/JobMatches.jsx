import { useEffect, useState } from 'react';
import jobService from '../../services/jobService';

const JobMatches = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Ideally this endpoint matches jobs to the worker, for now getting all jobs
                // In a real app, we'd use /api/jobs/matched or similar if implemented, 
                // or filter on client side based on simple matching logic.
                // The backend has a match engine but no direct route exposed for 'matched'.
                // We'll stick to 'all jobs' for MVP but call it 'Matches'.
                const data = await jobService.getJobs();
                setJobs(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const onApply = async (jobId) => {
        try {
            await jobService.applyForJob(jobId);
            alert('Applied Successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Error applying to job');
        }
    };

    if (isLoading) return <div>Loading Matches...</div>;

    return (
        <div className="container">
            <h1>Recommended Jobs</h1>
            <div className="job-list">
                {jobs.map((job) => (
                    <div key={job._id} className="card job-card" style={{ marginBottom: '15px' }}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p><strong>Salary:</strong> ₹{job.salary?.amount} / {job.salary?.period}</p>
                        <p><strong>Location:</strong> {job.location?.address}</p>
                        <button className="btn" onClick={() => onApply(job._id)}>Apply Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobMatches;
