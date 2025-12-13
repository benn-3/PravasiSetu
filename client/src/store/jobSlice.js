import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from '../services/jobService';

const initialState = {
    jobs: [], // All jobs or My jobs
    currentJob: null, // For single job view
    applicants: [],
    matchedWorkers: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Create Job
export const createJob = createAsyncThunk('jobs/create', async (jobData, thunkAPI) => {
    try {
        return await jobService.createJob(jobData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get All Jobs (Public)
export const getJobs = createAsyncThunk('jobs/getAll', async (_, thunkAPI) => {
    try {
        return await jobService.getJobs();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Employer's Jobs (My Jobs)
export const getMyJobs = createAsyncThunk('jobs/getMyJobs', async (_, thunkAPI) => {
    try {
        return await jobService.getMyJobs();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Applicants for a Job
export const getApplicants = createAsyncThunk('jobs/getApplicants', async (jobId, thunkAPI) => {
    try {
        return await jobService.getApplicants(jobId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Matched Workers for a Job
export const getMatchedWorkers = createAsyncThunk('jobs/getMatchedWorkers', async (jobId, thunkAPI) => {
    try {
        return await jobService.getMatchedWorkers(jobId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        resetJobState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.currentJob = null;
            state.applicants = [];
            state.matchedWorkers = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => { state.isLoading = true; })
            .addCase(createJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs.push(action.payload);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getJobs.pending, (state) => { state.isLoading = true; })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getMyJobs.pending, (state) => { state.isLoading = true; })
            .addCase(getMyJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getApplicants.pending, (state) => { state.isLoading = true; })
            .addCase(getApplicants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applicants = action.payload;
            })
            .addCase(getMatchedWorkers.pending, (state) => { state.isLoading = true; })
            .addCase(getMatchedWorkers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.matchedWorkers = action.payload;
            })
            .addCase(getMatchedWorkers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetJobState } = jobSlice.actions;
export default jobSlice.reducer;
