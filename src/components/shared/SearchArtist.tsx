import React, {useContext, FC, ReactElement} from 'react'
import BookingContext from '../../Context/BookingContext'

const SearchArtist : FC = () : ReactElement => {

  const {search, submitSearch} = useContext(BookingContext)
    
  return (
    <input 
    className='SearchBar'
    placeholder='Artist..'
    onChange={search}
    onKeyDown={submitSearch}
    >
    </input>
  )
}

export default SearchArtist
