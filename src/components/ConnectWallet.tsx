import React, {FC, useEffect} from 'react'
import {ethers} from 'ethers'
import {useNavigate} from 'react-router-dom'

declare var window : any 

type props = {
  provider :  ethers.providers.Web3Provider
  notConnected : boolean
  setNotConnected : React.Dispatch<React.SetStateAction<boolean>>
}

const ConnectWallet : FC<props> = ({provider, notConnected, setNotConnected}) => {


    const navigate = useNavigate() 

  const connect = async () =>  {

    console.log('clicked')

    await provider.send("eth_requestAccounts", [])
    
    if (window.ethereum.isConnected()){
      setNotConnected(false)
    }else{
      setNotConnected(true)
    }
    navigate("CreateArtist")

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
