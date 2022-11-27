import React, {FC, useEffect} from 'react'
import {ethers} from 'ethers'
import {useNavigate} from 'react-router-dom'
import {provider} from '../Contracts/ContractObjects'

declare var window : any 



const ConnectWallet : FC = () => {


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
