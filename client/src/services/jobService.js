import API from './api';

const createJob = async (jobData) => {
    const response = await API.post('/jobs', jobData);
    return response.data;
};

const getJobs = async () => {
    const response = await API.get('/jobs');
    return response.data;
};

const getMyJobs = async () => {
    const response = await API.get('/jobs/my');
    return response.data;
};

const getJobById = async (jobId) => {
    const response = await API.get(`/jobs/${jobId}`);
    return response.data;
};

const applyForJob = async (jobId) => {
    const response = await API.post(`/jobs/${jobId}/apply`);
    return response.data;
};

const getApplicants = async (jobId) => {
    const response = await API.get(`/jobs/${jobId}/applicants`);
    return response.data;
};

const getMatchedWorkers = async (jobId) => {
    const response = await API.get(`/jobs/${jobId}/matches`);
    return response.data;
};

const jobService = {
    createJob,
    getJobs,
    getMyJobs,
    getJobById,
    applyForJob,
    applyForJob,
    getApplicants,
    getMatchedWorkers
};

export default jobService;
