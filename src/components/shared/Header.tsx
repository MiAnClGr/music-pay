import React, {FC, ReactElement} from 'react'

type props = {
  connect : () => Promise<void>
  user : string
  balance : string
  tokenBalance : string

}

const Header : FC<props> = ({ connect, user, balance, tokenBalance }) : ReactElement => {
  
  return(
    
    <header className='Header'>
      <div className= 'User'>
        <text>Current User: {user} </text>
        <br></br>
        <br></br>
        <text>Current Eth Balance: {balance}</text>
        <br></br>
        <br></br>
        <text>Current $token Balance: {tokenBalance} </text>
      </div>
      
      
    </header>
  )
}

export default Header