import { createSlice } from '@reduxjs/toolkit';

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
    removeArticle
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

export const getArticle = (state, id) => state.articles.list.find(article => article.id === id);

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