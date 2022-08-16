const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true }

    case 'SET_STORIES':
      // if the search term is less than 3 letter simply fetch data and DO NOT filter
      if (state.query.length < 4) {
        return {
          ...state,
          isLoading: false,
          stories: action.payload.stories,
          nbArticles: action.payload.nbArticles,
        }
      } else {
        // if the search term is longer than 3 letters fetch and filter against search term(query)
        return {
          ...state,
          isLoading: false,
          stories: action.payload.stories.filter(
            (story) =>
              // search by story OR excerpt
              story.title.toLowerCase().startsWith(state.query) ||
              story.excerpt
                .toLowerCase()
                // remove <p> tags from excerpt
                .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '')
                .startsWith(state.query)
          ),
          nbArticles: action.payload.nbArticles,
        }
      }

    case 'REMOVE_STORY':
      // filter through stories and if dates don't match return it, if they DO match, DO NOT return it → this is how to remove only clicked ones
      return {
        ...state,
        stories: state.stories.filter((story) => story.date !== action.payload),
      }

    case 'HANDLE_SEARCH':
      // state.tempStories = state.stories.filter(
      //   (story) =>
      //     // search by story or excerpt
      //     story.title.toLowerCase().startsWith(action.payload) ||
      //     story.excerpt
      //       .toLowerCase()
      //       // remove <p> tags from excerpt
      //       .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '')
      //       .startsWith(action.payload)
      // )

      // console.log('state.tempStories: ', state.tempStories)
      // console.log('state.stories: ', state.stories);

      return {
        ...state,
        query: action.payload,
        // tempStories: state.stories,
        // stories: state.tempStories,
      }

    case 'FILTER_STORIES':
      return {
        ...state,
        stories: state.stories.filter(
          (story) => story.post_category_id === action.payload
        ),
      }

    default:
      throw new Error(`no matching '${action.type}' action type`)
  }
}
export default reducer
