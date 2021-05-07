import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import articles from './articles';
const reducer = combineReducers({
    articles,
})

const store = configureStore({ reducer, devTools: true, middleware: [thunk] });

export default store;
