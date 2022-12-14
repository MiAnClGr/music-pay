import React, {FC, ReactElement, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {provider} from '../Contracts/ContractObjects'

declare var window : any 

const ConnectWallet : FC = () : ReactElement => {

  const navigate = useNavigate() 

  const connect = async () =>  {
      navigate("/Loading")
    await provider.send("eth_requestAccounts", [])
    
    if (window.ethereum.isConnected()){
      navigate("/RoutingUser")
    }
  }

  useEffect(() =>{
  }, [window.ethereum.isConnected()])
  
  return (
    <div>
      <h3
      className= 'Link'
      style={{fontSize: "22px", fontWeight: "normal", margin: '0', cursor: "pointer"}}
      onClick= {connect}
      >
        Connect Wallet
      </h3>
    </div>
  )
}

export default ConnectWallet
