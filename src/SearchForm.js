import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const { query, handleSearch, stories } = useGlobalContext()

  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
      <input
        type='text'
        className='form-input'
        placeholder='...search article title or excerpt...'
        value={query}
        // maybe I could limit number of letters in search: if bigger than 3 only than activate handleSearch
        onChange={(e) => {
          handleSearch(e.target.value)}}
      />
      <br />
      <p className='nb-art'>Currently showing {stories.length} articles</p>
    </form>
  )
}

export default SearchForm
