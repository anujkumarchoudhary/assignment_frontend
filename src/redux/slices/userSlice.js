import { BASE_URL } from '@/config/baseUrl';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSignUp = createAsyncThunk(
    'user/userSignUp',
    async (body, thunkAPI) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/auth/signup`,
                body,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

export const getAllUser = createAsyncThunk(
    'user/getAllUser',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/auth/getAll`,
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (body, thunkAPI) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/auth/login`,
                body,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

const initialState = {
    userData: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Sign Up
            .addCase(userSignUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(userSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get all
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Login
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
