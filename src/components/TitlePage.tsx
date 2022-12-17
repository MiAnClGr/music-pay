import React, {FC, ReactElement, useEffect} from 'react'
import ConnectWallet from './ConnectWallet'
import {provider} from '../Contracts/ContractObjects'
import {motion} from 'framer-motion'

declare var window : any 

const TitlePage : FC = () : ReactElement => {

  const isConnected = async () => {
    if(provider != window.ethereum){
      console.log("install metamask")
    }
  }

  useEffect(() =>{
  }, [isConnected()])

  return (
    <motion.div 
    className= 'TitlePage'
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    transition={{duration: 0.2}}
    >
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <ConnectWallet/>
    </motion.div>
  )
}

export default TitlePage
