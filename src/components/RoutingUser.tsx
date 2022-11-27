import React, {FC} from 'react'
import {Link} from 'react-router-dom'

type props = {
  artistLoggedIn : boolean
  artistConnected : boolean
}

const RoutingUser : FC<props> = ({artistLoggedIn, artistConnected}) => {
  return (
    <div className='TitlePage'>
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <div className='Route'>
        {artistLoggedIn && artistConnected
        ?
          <Link
          className='Link'
          to= "/Profile"
          >
          Artists
          </Link>
        :
          <Link
          className='Link'
          to= "/ArtistMain"
          >
          Artists
          </Link>
        }
          
        <br></br>
        <br></br>
        <br></br>
        <Link 
        className='Link'
        to= "/BookingMain"
        >
        Bookings
        </Link>
      </div>
    </div>
  )
}

export default RoutingUser