import { Link } from 'react-router-dom';

const OfficerDashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>Officer Dashboard</h1>
            <div className="dashboard-actions">
                <Link to="/verification-queue" className="btn btn-primary">Verification Queue</Link>
                <Link to="/district-dashboard" className="btn btn-secondary">District Analytics</Link>
            </div>
        </div>
    );
};

export default OfficerDashboard;
