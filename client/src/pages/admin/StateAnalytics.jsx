import { useEffect, useState } from 'react';
import analyticsService from '../../services/analyticsService';

const StateAnalytics = () => {
    const [migrationData, setMigrationData] = useState([]);
    const [skillData, setSkillData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const migData = await analyticsService.getMigrationTrends();
                const skillData = await analyticsService.getSkillDistribution();
                setMigrationData(migData);
                setSkillData(skillData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>State Analytics</h1>

            <div className="row">
                <div className="col card" style={{ marginBottom: '20px' }}>
                    <h3>Migration Trends (Workers by State)</h3>
                    <ul>
                        {migrationData.map(item => (
                            <li key={item._id}>{item._id || 'Unknown'}: {item.count}</li>
                        ))}
                    </ul>
                </div>

                <div className="col card">
                    <h3>Skill Distribution</h3>
                    <ul>
                        {skillData.map(item => (
                            <li key={item._id}>{item._id}: {item.count}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StateAnalytics;
