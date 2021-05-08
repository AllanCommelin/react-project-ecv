import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

const initialState = {
    user: null
}

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, { payload }) {
            state.user = payload
        },
        resetUser(state) {
            state.user = null
        },
    }
});

// Actions
export const {
    addUser,
    resetUser
} = users.actions;


// Redux-thunk
export const registerUser = user => async dispatch => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        dispatch(addUser(data))
    } catch(e) {
        console.error(e);
    }
}

export const loginUser = profile => async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: profile.email, password: profile.password})
        })
        const data = await response.json();
        Cookies.set('jwt', data.accessToken)
        return response.status === 200
    } catch(e) {
        console.error(e);
        return false
    }
}

// Selectors
export const getCurrentUser = (state) => state.users.user;

export default users.reducer;