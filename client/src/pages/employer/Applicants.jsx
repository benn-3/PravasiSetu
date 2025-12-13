import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getApplicants } from '../../store/jobSlice';

const Applicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { applicants, isLoading } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(getApplicants(id));
    }, [dispatch, id]);

    if (isLoading) return <div>Loading Applicants...</div>;

    return (
        <div className="container">
            <h1>Applicants for Job</h1>
            {applicants.length === 0 ? (
                <p>No applicants yet.</p>
            ) : (
                <div className="list-group">
                    {applicants.map(app => (
                        <div key={app._id} className="list-item">
                            <h3>{app.worker.user.name}</h3>
                            <p>Email: {app.worker.user.email}</p>
                            <p>Status: {app.status}</p>
                            <p>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                            {/* Actions to accept/reject could go here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Applicants;
