import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import articles from './articles';
import users from './users';
const reducer = combineReducers({
    articles,
    users,
})

const store = configureStore({ reducer, devTools: true, middleware: [thunk] });

export default store;
