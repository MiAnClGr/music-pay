import React, {FC} from 'react'
import {ethers} from 'ethers'
import ConnectWallet from './ConnectWallet'


type props = {
  provider :  ethers.providers.Web3Provider
  notConnected : boolean
  setNotConnected : React.Dispatch<React.SetStateAction<boolean>>
}

const TitlePage : FC<props> = ({provider, notConnected, setNotConnected}) => {

 

  return (
    <div className= 'TitlePage'>
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <ConnectWallet
      provider= {provider}
      notConnected= {notConnected}
      setNotConnected= {setNotConnected}
      />
    </div>
  )
}

export default TitlePage
