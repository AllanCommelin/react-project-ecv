import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

const initialState = {
  list: []
}

const articles = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticle(state, { payload }) {
      state.list = [...state.list, payload]
    },
    addOrUpdateArticle(state, { payload }) {
      const index = state.list.findIndex(article => article.id === payload.id)

      //add if not find
      if (index === -1) {
        state.list = [...state.list, payload]
        return
      }

      state.list[index] = payload
    },
    findAndUpdateArticle(state, { payload }) {
      const index = state.list.findIndex(article => article.id === payload.id)
      state.list[index] = payload
    },
    addArticles(state, { payload }) {
      state.list = payload
    },
    removeArticle(state, { payload }) {
      state.list = [...state.list.filter(item => item.id !== payload.id)]    
    },
  }
});

// Actions
const {
    addArticle,
    addArticles,
    removeArticle,
    addOrUpdateArticle,
    findAndUpdateArticle
} = articles.actions;


// Redux-thunk
export const createArticle = article => async dispatch => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    })
    const data = await response.json();
    dispatch(addArticle(data))
  } catch(e) {
    console.error(e);
  }
}

export const retrieveArticles = () => async dispatch => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}articles`, {
      method: 'GET',
    })
    const data = await response.json();
    dispatch(addArticles(data))
  } catch(e) {
    console.error(e);
  }
}


export const retrieveArticle = id => async dispatch => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}articles/${id}`, {
      method: 'GET',
    })
    const data = await response.json();
    dispatch(addOrUpdateArticle(data))
  } catch(e) {
    console.error(e);
  }
}


export const updateArticle = article => async dispatch => {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}articles/${article.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Cookies.get('jwt')}`
          },
          body: JSON.stringify(article)
      })
      const data = await response.json();
      dispatch(findAndUpdateArticle(data))
      return response.status === 200
  } catch(e) {
      console.error(e)
      return false
  }
}


export const removeArticleById = id => async dispatch => {
   try {
    await fetch(`${process.env.REACT_APP_API_URL}articles/${id}`, {
      method: 'DELETE'
    })
    dispatch(removeArticle({ id }))
  } catch(e) {
    console.error(e);
  }
}


// Selectors
export const getArticles = (state) => state.articles.list;

export const getArticle = (state, id) => state.articles.list.find(article => article.id === parseInt(id));

const getArticleByIndex = (state, index) => state.articles.list[index];

export const getArticleIndex = (state, id) => state.articles.list.findIndex(article => article.id === id);

export const getNextArticle = (state, id) => {
  const index = getArticleIndex(state, id)
  if (index + 1 <= state.articles.list.length -1) {
    return getArticleByIndex(state, index +1)
  }
  return null
}

export const getPreviousArticle = (state, id) => {
  const index = getArticleIndex(state, id)
  if (index - 1 !== -1) {
    return getArticleByIndex(state, index -1)
  }
  return null
}

export default articles.reducer;