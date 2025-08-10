import { BASE_URL } from '@/config/baseUrl';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postBook = createAsyncThunk(
    'user/postBook',
    async ({ body, token }, thunkAPI) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/book/post`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

export const getAllBook = createAsyncThunk(
    'user/getAllBook',
    async ({ _, token }, thunkAPI) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/book/getAll`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

export const getSingleBook = createAsyncThunk(
    'user/getSingleBook',
    async ({ id, token }, thunkAPI) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/book/getSingle/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);
export const requestBook = createAsyncThunk(
    'user/requestBook',
    async ({ id, token }, thunkAPI) => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/book/request/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

export const updateStatus = createAsyncThunk(
    'user/updateStatus',
    async ({ id, body, token }, thunkAPI) => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/book/updateStatus/${id}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

export const updateBook = createAsyncThunk(
    'user/updateBook',
    async ({ id, body, token }, thunkAPI) => {
        try {
            const res = await axios.put(
                `${BASE_URL}/book/update/${id}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.log('err', err);
            return thunkAPI.rejectWithValue(err.response?.data || 'error');
        }
    }
);

export const deleteBook = createAsyncThunk(
    'user/deleteBook',
    async ({ id, token }, thunkAPI) => {
        try {
            const res = await axios.delete(
                `${BASE_URL}/book/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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
    bookData: null,
    singleBook: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // post
            .addCase(postBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postBook.fulfilled, (state, action) => {
                state.loading = false;
                state.bookData = action.payload;
            })
            .addCase(postBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get all
            .addCase(getAllBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBook.fulfilled, (state, action) => {
                state.loading = false;
                state.bookData = action.payload;
            })
            .addCase(getAllBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get single
            .addCase(getSingleBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleBook.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBook = action.payload;
            })
            .addCase(getSingleBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // request
            .addCase(requestBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestBook.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBook = action.payload;
            })
            .addCase(requestBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBook = action.payload;
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.bookData = action.payload;
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default userSlice.reducer;
