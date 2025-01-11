import {createSlice , configureStore} from '@reduxjs/toolkit';
import {userAuthSlice} from './userAuthenticationSlice';


export const store =  configureStore({
    reducer: {
        auth : userAuthSlice.reducer
    }
});


export default store;