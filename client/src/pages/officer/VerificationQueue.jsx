import { useEffect, useState } from 'react';
import workerService from '../../services/workerService';

const VerificationQueue = () => {
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await workerService.getAllWorkers(); // Get all workers
                // Filter for unverified
                const unverified = data.filter(w => !w.user.isVerified);
                setWorkers(unverified);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkers();
    }, []);

    const onVerify = async (userId) => {
        try {
            await workerService.verifyWorker(userId);
            setWorkers(workers.filter(w => w.user._id !== userId));
            alert('Worker Verified');
        } catch (error) {
            alert('Verification failed');
        }
    };

    if (isLoading) return <div>Loading Queue...</div>;

    return (
        <div className="container">
            <h1>Verification Queue</h1>
            {workers.length === 0 ? <p>No pending verifications.</p> : (
                <div className="list-group">
                    {workers.map(worker => (
                        <div key={worker._id} className="list-item">
                            <h3>{worker.user.name}</h3>
                            <p>Dist: {worker.user.location?.district || 'N/A'}</p>
                            <p>Skills: {worker.skills.join(', ')}</p>
                            <button className="btn" onClick={() => onVerify(worker.user._id)}>Verify Identity</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VerificationQueue;
