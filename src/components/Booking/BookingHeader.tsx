import React, {FC, useState, ReactElement} from 'react'
import { Link } from 'react-router-dom'
import Home from "../shared/Home"
import SearchArtist from "../shared/SearchArtist"
import {AnimatePresence} from 'framer-motion'

const BookingHeader : FC= () : ReactElement => {

  /// state variables
  const [searchClicked, setSearchClicked] = useState(false)
  
  return(
    
    <header className='Header'>
      
      <Home/>

      <div
      className='HeaderMenu'
      >
        <Link
        className='HeaderMenuTitle' 
        to= "/About"
        >
        About
        </Link>
        <Link
        className='HeaderMenuTitle' 
        to= "/EscrowList"
        >
        Active Escrows
        </Link>
        <Link
					className='HeaderMenuTitle' 
					to= "/Contact"
					>
					Contact
				</Link>
      </div>
      
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