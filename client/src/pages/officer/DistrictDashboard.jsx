import { useEffect, useState } from 'react';
import analyticsService from '../../services/analyticsService';

const DistrictDashboard = () => {
    // Mocking district data for now as backend endpoint is global stats
    // Ideally we filter backend stats by district
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await analyticsService.getStats();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>District Dashboard</h1>
            <div className="stats-grid">
                <div className="card">
                    <h3>Registered Workers</h3>
                    <p>{stats.workers}</p>
                </div>
                <div className="card">
                    <h3>Active Employers</h3>
                    <p>{stats.employers}</p>
                </div>
                <div className="card">
                    <h3>Open Jobs</h3>
                    <p>{stats.activeJobs}</p>
                </div>
            </div>
            {/* Charts could go here */}
        </div>
    );
};

export default DistrictDashboard;
