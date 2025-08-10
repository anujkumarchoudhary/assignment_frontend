// slices/globalSlice.js
import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
    name: "global",
    initialState: {
        user: null,
        refresh: false
    },
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload
        },

        clearUserData: (state) => {
            state.user = null
        },
        triggerRefresh: (state) => {
            state.refresh = !state.refresh
        },
    }
})

export const { setUserData, clearUserData, triggerRefresh } = globalSlice.actions;
export default globalSlice.reducer;
