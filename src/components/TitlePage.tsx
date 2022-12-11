import React, {FC, ReactElement} from 'react'
import ConnectWallet from './ConnectWallet'
import {motion} from 'framer-motion'

const TitlePage : FC = () : ReactElement => {

  return (
    <motion.div 
    className= 'TitlePage'
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    >
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <ConnectWallet/>
    </motion.div>
  )
}

export default TitlePage
