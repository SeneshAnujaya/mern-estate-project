import { createSlice } from '@reduxjs/toolkit';
import { updateUser } from '../../../../api/controllers/user.controller';

const initialState = {
    currentUser : null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        SignInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        SignInFailure: (state, action) => {
            state.error =  action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error =  action.payload;
            state.loading = false;
        }
    }
});

export const { signInStart, SignInSuccess, SignInFailure, updateUserStart, updateUserSuccess, updateUserFailure} = userSlice.actions;
export default userSlice.reducer;