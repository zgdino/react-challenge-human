import React from 'react'
import { useGlobalContext } from './context'

const Categories = () => {
  const { stories, filterStories, fetchStories, API } = useGlobalContext()

  // getting all the categories
  const allCategories = [
    ...new Set(stories.map((story) => story.post_category_id)),
  ]

  return (
    <div className='btn-container'>
      {allCategories.map((category, index) => {
        return (
          <button
            type='button'
            key={index}
            onClick={() => filterStories(category)}
          >
            {/* switching from numbered to named categories */}
            {category === '1' ? 'X Universe' : null}
            {category === '2' ? 'Elite: Dangerous' : null}
            {category === '3' ? 'Starpoint Gemini' : null}
            {category === '4' ? 'EVE Online' : null}
          </button>
        )
      })}
      <button type='button' onClick={() => fetchStories(`${API}`)}>
        ALL
      </button>
    </div>
  )
}

export default Categories
