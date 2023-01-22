import React, {FC, useContext, ReactElement} from 'react'
import {Link} from 'react-router-dom'
import ArtistContext from '../Context/ArtistContext'
import {motion} from 'framer-motion'

const RoutingUser : FC = () : ReactElement => {

  const {artistLoggedIn} = useContext(ArtistContext)

  return (
    <motion.div 
    className='TitlePage'
    style={{
      height: "100%",
      width: "100%"
    }}
    initial= {{y:0, opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    transition={{duration: 0.2}}
    >
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <div className='Route'>
        {artistLoggedIn
        ?
        <Link
        className='Link'
        style={{height: "50%", fontSize: "22px"}}
        to= "/ArtistProfile"
        >
        Enter Artists
        </Link>
        :
        <Link
        className='Link'
        style={{height: "50%", fontSize: "22px"}}
        to= "/ArtistMain"
        >
        Enter Artists
        </Link>
        }
        <br></br>
        <br></br>
        <br></br>
        <Link 
        className='Link'
        style={{height: "50%", fontSize: "22px"}}
        to= "/BookingMain"
        >
        Enter Bookings
        </Link>
      </div>
    </motion.div>
  )
}

export default RoutingUser