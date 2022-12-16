import { normalize } from 'path'
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
   
    <button
    className= 'Submit'
    style={{
      color: "white",
      backgroundColor: "black",
      width: "20%",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: "bold",
      opacity: "0.8",
      fontSize: "12px",
      cursor: "pointer",
      borderStyle: "solid",
      borderColor: "grey",
      padding: "12px",
      borderRadius: "10px"

      }}
    onClick= {connect}
    >
      CONNECT WALLET
    </button>
   
  )
}

export default ConnectWallet
