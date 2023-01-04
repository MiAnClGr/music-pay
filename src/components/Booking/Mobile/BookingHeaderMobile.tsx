import React, {FC, useState, ReactElement} from 'react'
import BookingDropdownMenu from './BookingDropdownMenu'
import SearchArtist from "../../shared/SearchArtist"
import {AnimatePresence} from 'framer-motion'
import { IoIosMenu } from 'react-icons/io'

const BookingHeaderMobile : FC= () : ReactElement => {

  const [searchClicked, setSearchClicked] = useState(false)
  const [iconClicked, setIconClicked] = useState(false)

  const handleClick = () => {
      setIconClicked(!iconClicked)
  }

  
  return(
    
    <header className='HeaderMobile'>

        <IoIosMenu
        className='DropdownIcon'
        onClick={handleClick}
        />  

        {iconClicked
        ?
        <BookingDropdownMenu/>
        :
        <></>
        }
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

export default BookingHeaderMobile