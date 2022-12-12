import React, {FC, useContext, ReactElement} from 'react'
import {Link} from 'react-router-dom'
import ArtistContext from '../Context/ArtistContext'
import {motion} from 'framer-motion'

const RoutingUser : FC = () : ReactElement => {

  const {artistLoggedIn, artistConnected} = useContext(ArtistContext)

  return (
    <motion.div 
    className='TitlePage'
    initial= {{y:0, opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    transition={{duration: 0.2}}
    >
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
    </motion.div>
  )
}

export default RoutingUser