import React, {FC, ReactElement, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Home from "./Home"
import {signer} from '../../Contracts/ContractObjects'


type props = {
  artistName : string
  artistAddress : string | undefined
  artistProfileAddress : string
  setArtistAddress :  React.Dispatch<React.SetStateAction<string>>
  artistLoggedIn : boolean
  displayUpdateAboutMe : () => void
  displayBookings : () => void
  artistConnected : boolean
  setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
}
const ArtistHeader : FC<props> = ({
    artistName,
    artistAddress,
    artistProfileAddress,
    setArtistAddress,
    artistLoggedIn,
    displayUpdateAboutMe,
    displayBookings,  
    artistConnected, 
    setArtistConnected
  }) : ReactElement => {

  const getArtistConnected = async () => {
    try{
      if(artistAddress == await signer.getAddress()){
        console.log(await signer.getAddress())
        console.log(artistAddress)
        setArtistConnected(true)
        console.log(artistConnected)
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
  },[artistLoggedIn])

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
      onClick= {displayUpdateAboutMe} 
      >
        Update
      </h4>
      :
      <></>
      }
      {artistLoggedIn && artistConnected
      ?
      <h4
      className='DisplayBookings'
      onClick={displayBookings}
      >
        Bookings
      </h4>
      :
      <></>
      }
    </header>
  )
}

export default ArtistHeader