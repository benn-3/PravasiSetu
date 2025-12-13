import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getMatchedWorkers, resetJobState } from '../../store/jobSlice';

const EmployerMatches = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { matchedWorkers, isLoading, isError, message } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(getMatchedWorkers(id));

        return () => {
            dispatch(resetJobState());
        }
    }, [dispatch, id]);

    if (isLoading) return <div>Loading Matches...</div>;

    if (isError) return <div className="alert alert-danger">Error: {message}</div>;

    return (
        <div className="container">
            <h1>Recommended Workers for Job</h1>
            <Link to="/employer-dashboard" className="btn btn-light" style={{ marginBottom: '20px' }}>Back to Dashboard</Link>

            {matchedWorkers.length === 0 ? (
                <p>No suitable matches found yet.</p>
            ) : (
                <div className="worker-list">
                    {matchedWorkers.map(match => (
                        <div key={match.worker._id} className="card worker-card" style={{ padding: '20px', marginBottom: '15px', borderLeft: '5px solid #28a745' }}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h3>{match.worker.user.name}</h3>
                                    <p><strong>Skills:</strong> {match.worker.skills.join(', ')}</p>
                                    <p><strong>Experience:</strong> {match.worker.experience} years</p>
                                    <p><strong>Match Score:</strong> <span className="badge badge-success">{match.score}</span></p>
                                </div>
                                <div className="text-right">
                                    <p>Distance: {match.distance ? `${match.distance.toFixed(1)} km` : 'N/A'}</p>
                                    <button className="btn btn-primary" disabled>Contact (Premium)</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmployerMatches;
