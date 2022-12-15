import React from 'react'
import {motion} from "framer-motion"

const About = () => {
  return (
    <motion.div
    className='Text'
    style={{
        textAlign: "center", 
        height: "100%",
        marginTop: "15%"
    }}
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    >

        <h1>MUSIC-PAY</h1>

        <h3>A web3 solution for reliable and trustless payment from Booking agent to Artist</h3>

        <h3>Currently deployed at https://music-pay.vercel.app/</h3>

        <h3>Smart contracts are deployed on Mumbai</h3>

        <h3>To interact with the dApp please connect via metamask to the mumbai network</h3>
      
    </motion.div>
  )
}

export default About
