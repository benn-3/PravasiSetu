import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyJobs } from '../../store/jobSlice';

const EmployerDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { jobs, isLoading } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(getMyJobs());
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="dashboard-container">
            <h1>Employer Dashboard</h1>
            <div className="dashboard-header">
                <h2>Welcome, {user && user.name}</h2>
                <Link to="/post-job" className="btn btn-primary">Post New Job</Link>
            </div>

            <div className="jobs-section">
                <h3>Your Active Jobs</h3>
                {jobs.length === 0 ? (
                    <p>No jobs posted yet.</p>
                ) : (
                    <div className="job-list">
                        {jobs.map(job => (
                            <div key={job._id} className="card job-card" style={{ marginBottom: '15px' }}>
                                <h4>{job.title}</h4>
                                <p><strong>Status:</strong> {job.status}</p>
                                <p><strong>Applicants:</strong> {job.applicantsCount || 'View to see'}</p>
                                <Link to={`/job/${job._id}/applicants`} className="btn btn-sm">View Applicants</Link>
                                <Link to={`/job/${job._id}/matches`} className="btn btn-sm btn-outline-primary" style={{ marginLeft: '10px' }}>Find Matches</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
