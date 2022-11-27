import React, {FC} from 'react'
import {ethers} from 'ethers'
import ConnectWallet from './ConnectWallet'
import {provider} from "../Contracts/ContractObjects"


const TitlePage : FC = () => {

 

  return (
    <div className= 'TitlePage'>
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <ConnectWallet/>
    </div>
  )
}

export default TitlePage
