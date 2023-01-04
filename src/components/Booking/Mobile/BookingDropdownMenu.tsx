import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../shared/Home'

const BookingDropdownMenu = () => {
  return (
    <div
    className='BookingDropdownMenu'
    >
      <div className='HomeHeaderMobile'>
        <Home/>
      </div>
      <Link
      className='AboutMobile' 
      to= "/About"
      >
      About
      </Link>
      <Link
      className='ActiveEscrowsMobile' 
      to= "/ActiveEscrows"
      >
      Active Escrows
      </Link>
    </div>
  )
}

export default BookingDropdownMenu
