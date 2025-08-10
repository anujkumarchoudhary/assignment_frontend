import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import globalReducer from './slices/globalSlice'
import bookReducer from './slices/bookSlice'

const store = configureStore({
    reducer: {
        global: globalReducer,
        user: userReducer,
        book: bookReducer
    }
})

export default store;