import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import notesReducer from './reducers/notesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: notesReducer, 
    },
})

export default store;