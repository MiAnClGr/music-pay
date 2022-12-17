import React, { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import ArtistContext from '../../Context/ArtistContext'

const LogOut = () : ReactElement=> {

    const {logoutArtist} = useContext(ArtistContext)

  return (
    <Link
    className='Logout'
    to={"/RoutingUser"}
    onClick={logoutArtist}
    >
      LOG OUT
    </Link>
  )
}

export default LogOut
