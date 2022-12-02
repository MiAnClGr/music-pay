import React, {FC, ReactElement, useEffect, useState} from 'react'
import { Contract } from 'ethers'
import { Link, useNavigate } from 'react-router-dom'
import Home from "./Home"
import {signer} from '../../Contracts/ContractObjects'


type props = {
  artistName : string
  artistAddress : string | undefined
  setArtistAddress :  React.Dispatch<React.SetStateAction<string>>
  artistProfileAddress : string
  artistLoggedIn : boolean
  setArtistLoggedIn :  React.Dispatch<React.SetStateAction<boolean>>
  openInput : () => void
  artistConnected : boolean
  setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
}
const ArtistHeader : FC<props> = (
    {artistName,
    artistAddress,
    setArtistAddress,
    artistLoggedIn,
    openInput, 
    setArtistLoggedIn, 
    artistConnected, 
    setArtistConnected}) : ReactElement => {
  
  const navigate = useNavigate()

  const getArtistConnected = async () => {
    try{
      if(artistAddress == await signer.getAddress()){
        console.log(await signer.getAddress())
        setArtistConnected(true)
      }else{
        setArtistConnected(false)
        setArtistAddress("")
      }
    }catch(e){
      setArtistConnected(false)
    }
  
  }


  useEffect(() => {
    getArtistConnected()
  },[artistAddress])

  console.log(artistLoggedIn)
  console.log(artistConnected)
  console.log(artistName)



  return(
    
    <header className='Header'>
      <div className='HomeHeader'>
        <Home/>
      </div>
      <Link
      className='About' 
      to= "/Login"
      >
      About
      </Link>
      <Link
      className='Create' 
      to= "/CreateNew"
      >
      Create
      </Link>
      {artistLoggedIn && artistConnected
      ? 
      <h1 className='ArtistName'>{artistName}</h1>
      : 
      <Link
      className='Login' 
      to= "/Login"
      >
      Login
      </Link>
      }
      {artistLoggedIn && artistConnected
      ?
      <h4  
      className='UpdateAboutMe'
      onClick= {openInput} 
      >
        Update
      </h4>

      :

      <></>
      }
    </header>
  )
}

export default ArtistHeader