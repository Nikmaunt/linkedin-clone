import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserCredential from "firebase/compat/app"
import firebase from 'firebase/compat/app';


type UserCredential = {
    additionalUserInfo?: firebase.auth.AdditionalUserInfo | null;
    credential?: firebase.auth.AuthCredential | null;
    operationType?: string | null;
    user: firebase.User | null;
};

const initialState: UserCredential = {
    user: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
});

export const {  login, logout } = userSlice.actions;

export const selectUser = (state: UserCredential| any ) => state.user?.user

export default userSlice.reducer;