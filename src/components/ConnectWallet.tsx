import React, {FC, ReactElement, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {provider} from '../contracts/ContractObjects'

declare var window : any 

const ConnectWallet : FC = () : ReactElement => {

  const navigate = useNavigate() 

  const connect = async () =>  {

    await provider.send("eth_requestAccounts", [])
    
    if (window.ethereum.isConnected()){
      navigate("/RoutingUser")
    }
  }

  useEffect(() =>{
  }, [window.ethereum.isConnected()])
  
  return (
    <div>
      <button
      className= 'Connect'
      onClick= {connect}
      >
        Connect Wallet
      </button>
    </div>
  )
}

export default ConnectWallet
