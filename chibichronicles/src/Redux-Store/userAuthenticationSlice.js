import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isUserLoggedIn : false,
    userEmail : '',
    username : ''
};


export const userAuthSlice = createSlice({
    name : 'UserAuthentication',
    initialState : initialState,
    reducers: {
        setIsUserLoggedIn(state , action){
            state.isUserLoggedIn = action.payload;
        },
        setUserEmail(state , action) {
            state.userEmail = action.payload;
        },
        setUsername(state , action){
            state.username = action.payload;
        }
    }
});

export const userAuthentication = userAuthSlice.actions;