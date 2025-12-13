import API from './api';

const getProfile = async () => {
    const response = await API.get('/worker/profile');
    return response.data;
};

const updateProfile = async (profileData) => {
    const response = await API.post('/worker/profile', profileData);
    return response.data;
};

const getAllWorkers = async () => {
    const response = await API.get('/worker');
    return response.data;
};

const verifyWorker = async (userId) => {
    const response = await API.put(`/worker/${userId}/verify`);
    return response.data;
};

const workerService = {
    getProfile,
    updateProfile,
    getAllWorkers,
    verifyWorker
};

export default workerService;
