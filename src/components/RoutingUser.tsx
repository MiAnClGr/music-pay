import React, {FC, useContext, ReactElement} from 'react'
import {Link} from 'react-router-dom'
import ArtistContext from '../Context/ArtistContext'

const RoutingUser : FC = () : ReactElement => {

  const {artistLoggedIn, artistConnected} = useContext(ArtistContext)

  return (
    <div className='TitlePage'>
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <div className='Route'>
        {artistLoggedIn && artistConnected
        ?
        <Link
        className='Link'
        to= "/ArtistProfile"
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