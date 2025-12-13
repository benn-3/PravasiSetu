import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorkerProfile } from '../../store/workerSlice';

const WorkerDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.worker);

    useEffect(() => {
        dispatch(getWorkerProfile());
    }, [dispatch]);

    return (
        <div className="dashboard-container">
            <h1>Welcome, {user && user.name}</h1>
            <p>Role: {user && user.role}</p>

            {!profile ? (
                <div className="alert alert-warning">
                    Please complete your profile to get job matches.
                    <Link to="/skill-profile">Update Profile</Link>
                </div>
            ) : (
                <div className="stats-grid">
                    <div className="card">
                        <h3>Skills</h3>
                        <p>{profile.skills.join(', ')}</p>
                    </div>
                    <div className="card">
                        <h3>Status</h3>
                        <p>{profile.isAvailable ? 'Available' : 'Busy'}</p>
                    </div>
                </div>
            )}

            <div className="dashboard-actions">
                <Link to="/skill-profile" className="btn btn-secondary">Update Skills</Link>
                <Link to="/job-matches" className="btn btn-primary">View Job Matches</Link>
                <Link to="/work-history" className="btn btn-light">Work History</Link>
            </div>
        </div>
    );
};

export default WorkerDashboard;
