import React, {FC, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import {ArtistFactoryContract, signer, provider}from "../ContractObjects"
import ConnectWallet from './ConnectWallet'
import { unstable_createStaticHandler } from '@remix-run/router'

type props = {
  provider :  ethers.providers.Web3Provider
  notConnected : boolean
  setNotConnected : React.Dispatch<React.SetStateAction<boolean>>
}

const TitlePage : FC<props> = ({provider, notConnected, setNotConnected}) => {

  const [artistExists, setArtistExists] = useState<boolean | null>()
  const [artistsLoading, setArtistsLoading] = useState<boolean | null>()
  

  const navigate = useNavigate()

  // const doesArtistExist = async () => {
  //   setArtistsLoading(true)
  //   const address = await signer.getAddress()
  //   const ownerToArtist = await ArtistFactoryContract.ownerToArtist(address)
  //   console.log(ownerToArtist)
  //   if(ownerToArtist !== "0x0000000000000000000000000000000000000000"){
  //     setArtistExists(true)
  //   }
  //   setArtistsLoading(false)
  // }

  // useEffect(() => {
  //   doesArtistExist();
  // }, [])

  // useEffect(() => {
  //   if(artistExists){
  //     navigate("Profile")
  //   } else {
  //     navigate("CreateArtist")
  //   }

  // }, [artistsLoading === false]) 

  return (
    <div className= 'TitlePage'>
        <ConnectWallet
        provider= {provider}
        notConnected= {notConnected}
        setNotConnected= {setNotConnected}
        />
    </div>
  )
}

export default TitlePage
