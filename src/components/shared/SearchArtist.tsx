import React, {useContext, FC, ReactElement} from 'react'
import BookingContext from '../../Context/BookingContext'
import {motion} from 'framer-motion'

const SearchArtist : FC = () : ReactElement => {

  const {search, submitSearch} = useContext(BookingContext)
    
  return (
    <motion.input 
    className='SearchBar'
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    placeholder='Artist..'
    onChange={search}
    onKeyDown={submitSearch}
    >
    </motion.input>
  )
}

export default SearchArtist
