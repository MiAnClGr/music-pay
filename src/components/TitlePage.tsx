import React, {FC, ReactElement} from 'react'
import ConnectWallet from './ConnectWallet'

const TitlePage : FC = () : ReactElement => {

  return (
    <div className= 'TitlePage'>
      <h1 className='Music-Pay-Title'>Music-Pay</h1>
      <ConnectWallet/>
    </div>
  )
}

export default TitlePage
