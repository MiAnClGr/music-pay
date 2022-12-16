import React, {FC, useState, ReactElement} from 'react'
import { Link } from 'react-router-dom'
import Home from "./Home"
import SearchArtist from "../shared/SearchArtist"
import {AnimatePresence} from 'framer-motion'

const BookingHeader : FC= () : ReactElement => {

  const [searchClicked, setSearchClicked] = useState(false)
  
  return(
    
    <header className='Header'>
      <div className='HomeHeader'>
        <Home/>
      </div>
      <Link
      className='About' 
      to= "/About"
      >
      About
      </Link>
      <div className='Search'>
        
        {searchClicked 
        ? 
        <AnimatePresence>
          <SearchArtist/>
        </AnimatePresence>
        :
        <></>
        }
        <h3
        className='SearchText'
        onClick= {() => setSearchClicked(!searchClicked)}
        >
        Search
        </h3>
      </div>
    </header>
  )
}

export default BookingHeader