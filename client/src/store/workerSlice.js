
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workerService from '../services/workerService';

const initialState = {
    profile: null,
    jobs: [], // Matched jobs
    workHistory: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Get Worker Profile
export const getWorkerProfile = createAsyncThunk('worker/getProfile', async (_, thunkAPI) => {
    try {
        return await workerService.getProfile();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update Worker Profile
export const updateWorkerProfile = createAsyncThunk('worker/updateProfile', async (profileData, thunkAPI) => {
    try {
        return await workerService.updateProfile(profileData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const workerSlice = createSlice({
    name: 'worker',
    initialState,
    reducers: {
        resetWorkerState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWorkerProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWorkerProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(getWorkerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateWorkerProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateWorkerProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(updateWorkerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetWorkerState } = workerSlice.actions;
export default workerSlice.reducer;
