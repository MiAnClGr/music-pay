import React, {FC, useEffect} from 'react'
import {ethers} from 'ethers'

declare var window : any 

type props = {
  provider :  ethers.providers.Web3Provider
  notConnected : boolean
  setNotConnected : React.Dispatch<React.SetStateAction<boolean>>
}

const ConnectWallet : FC<props> = ({provider, notConnected, setNotConnected}) => {

  // const [currentAccount, setCurrentAccount] = React.useState('Ox')
  // const [userBalance, setUserBalance] = React.useState('')
  // const [contractBalance, setContractBalance] = React.useState('')
  // const [admin, setAdmin] = React.useState('')

    //connecting wallet//

  const connect = async () =>  {

    console.log('clicked')

    await provider.send("eth_requestAccounts", [])
    
    if (window.ethereum.isConnected()){
      setNotConnected(false)
    }else{
      setNotConnected(true)
    }

    


    // const currentAddress = await signer.getAddress()
    //   await console.log(currentAddress)

    // setCurrentAccount(currentAddress)
    //   await console.log(currentAccount)

    // const balance = await provider.getBalance(currentAddress)
    // await console.log(ethers.utils.formatEther(balance))
    

    // setUserBalance(ethers.utils.formatEther(balance))

    // const contractBalance = await crowdFundingContract.getBalance()

    // setContractBalance(ethers.utils.formatEther(contractBalance))

    // console.log(contractBalance)

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
