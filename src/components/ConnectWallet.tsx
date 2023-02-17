import React, {FC, ReactElement} from 'react'
import {useNavigate} from 'react-router-dom'
import {provider} from '../Contracts/ContractObjects'

declare var window : any 

const ConnectWallet : FC = () : ReactElement => {

  const navigate = useNavigate() 

  const connect = async () =>  {
      navigate("/Loading")

    try{
      await provider.send("eth_requestAccounts", [])
    }catch(e){
      console.log(e,"metamask is not detected")
      navigate("/MetamaskNotDetected")
    }finally{
      if (window.ethereum.isConnected()){
        navigate("/RoutingUser")
    }
  }

}
  return (
   
    <button
    className= 'Connect'
    onClick= {connect}
    >
      CONNECT WALLET
    </button>
   
  )
}

export default ConnectWallet
