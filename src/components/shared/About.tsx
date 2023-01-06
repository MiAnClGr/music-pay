import React, {useContext} from 'react'
import {motion} from "framer-motion"
import ArtistContext from '../../Context/ArtistContext'
import ArtistHeader from '../Artist/ArtistHeader'
import BookingHeader from '../Booking/BookingHeader'
import LogOut from './LogOut'

const About = () => {

  const {artistLoggedIn} = useContext(ArtistContext)

  return (
    <div 
    style={{height: "100%"}}
    >
      {artistLoggedIn
      ?
      <ArtistHeader/>
      :
      <BookingHeader/>
      }
      <motion.div
      className='Text'
      style={{
          textAlign: "center", 
          height: "100%",
          marginTop: "8%"
      }}
      initial= {{opacity: 0}}
      animate= {{opacity: 1}}
      exit= {{opacity: 0}}
      >

          <h1>MUSIC-PAY</h1>

          <h3 style={{fontWeight: "normal"}}>A web3 solution for reliable and trustless payment from Booking agent to Artist</h3>

          <h3 style={{fontWeight: "normal"}}>Currently deployed at https://music-pay.vercel.app/</h3>

          <h3 style={{fontWeight: "normal"}}>Smart contracts are deployed on Mumbai</h3>

          <h3 style={{fontWeight: "normal"}}>To interact with the dApp please connect via metamask to the mumbai network</h3>
        
      </motion.div>
      {artistLoggedIn
      ?
      <LogOut/>
      :
      <></>   
      }
    </div>
  )
}

export default About
