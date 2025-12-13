import API from './api';

const getMigrationTrends = async () => {
    const response = await API.get('/analytics/migration');
    return response.data;
};

const getSkillDistribution = async () => {
    const response = await API.get('/analytics/skills');
    return response.data;
};

const getStats = async () => {
    const response = await API.get('/analytics/stats');
    return response.data;
};

const analyticsService = {
    getMigrationTrends,
    getSkillDistribution,
    getStats
};

export default analyticsService;
