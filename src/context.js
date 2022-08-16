import React, { useContext, useEffect, useReducer } from 'react'

import reducer from './reducer'

const API = 'https://www.alpha-orbital.com/last-100-news.json'

const IMAGE_LINK = 'https://www.alpha-orbital.com/assets/images/post_img/'

const ARTICLE_LINK = 'https://www.alpha-orbital.com/news/'

const initialState = {
  isLoading: true,
  stories: [],
  tempStories: [],
  query: '',
  page: 0,
  nbArticles: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async (url) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: 'SET_STORIES',
        payload: { stories: data, nbArticles: data.length },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeStory = (id) => {
    dispatch({ type: 'REMOVE_STORY', payload: id })
  }

  const handleSearch = (query) => {
    dispatch({ type: 'HANDLE_SEARCH', payload: query })
  }

  const filterStories = (category) => {
    dispatch ({type: 'FILTER_STORIES', payload: category})
  }

  useEffect(() => {
      fetchStories(`${API}`)
  }, [state.query])

  return (
    <AppContext.Provider
      value={{ ...state, API, IMAGE_LINK, ARTICLE_LINK, removeStory, handleSearch, filterStories, fetchStories }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
