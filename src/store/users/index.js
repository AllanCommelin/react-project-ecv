import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

const initialState = {
    user: null,
    list: [],
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
        addOrUpdateUserList(state, { payload }) {
            state.list = [...state.list, payload]
        },
        addUsersList(state, { payload }) {
            state.list = payload
        },
    }
});

// Actions
export const {
    addUser,
    resetUser,
    addOrUpdateUserList,
    addUsersList
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
        
        Cookies.set('jwt', data.accessToken)

        return response.status === 201
    } catch(e) {
        console.error(e)
        return false
    }
}

export const updateUser = user => async dispatch => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        dispatch(addUser(data))
        return response.status === 200
    } catch(e) {
        console.error(e)
        return false
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
        console.error(e)
        return false
    }
}

export const retrieveUsers = () => async dispatch => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}users`, {
        method: 'GET',
      })
      const data = await response.json();
      dispatch(addUsersList(data))
    } catch(e) {
      console.error(e);
    }
}

export const retrieveUser = id => async dispatch => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}users/${id}`, {
        method: 'GET',
      })
      const data = await response.json();
      
      dispatch(addOrUpdateUserList(data))
    } catch(e) {
      console.error(e);
    }
}
  

// Selectors
export const getCurrentUser = (state) => state.users.user;

export const getUser = (state, id) => {
    console.log('getUser:')
    console.log({id})
    console.log('users.list',state.users.list)
    return state.users.list.find(user => user.id === parseInt(id))
};

export default users.reducer;