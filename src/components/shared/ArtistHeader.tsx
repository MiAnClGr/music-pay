import React, {FC, ReactElement, useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {Link} from 'react-router-dom'
import Home from "./Home"
import {signer} from '../../Contracts/ContractObjects'


type props = {
  artistAddress : string | undefined
  artistProfileAddress : string
  setArtistAddress :  React.Dispatch<React.SetStateAction<string>>
  artistLoggedIn : boolean
  displayUpdateAboutMe : () => void
  displayBookings : () => void
  artistConnected : boolean
  setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
  createArtistProfileInstance : (artist: string) => ethers.Contract
}
const ArtistHeader : FC<props> = ({
    artistAddress,
    artistProfileAddress,
    setArtistAddress,
    artistLoggedIn,
    displayUpdateAboutMe,
    displayBookings,  
    artistConnected, 
    setArtistConnected,
    createArtistProfileInstance
  }) : ReactElement => {

    const [name, setName] = useState("")

  const getArtistConnected = async () => {
    try{
      if(artistAddress == await signer.getAddress()){
        console.log(await signer.getAddress())
        console.log(artistAddress)
        setArtistConnected(true)
        console.log(artistConnected)
        console.log(artistLoggedIn)
      }else{
        setArtistConnected(false)
        setArtistAddress("")
      }
    }catch(e){
      setArtistConnected(false)
    }
  
  }

  const getArtistName = async () => {
    const artistProfile = createArtistProfileInstance(artistProfileAddress)
    const name = await artistProfile.artistName()
    console.log(name)
    setName(name)
  }

  useEffect(() => {
    getArtistConnected()
  },[artistLoggedIn])

  useEffect(() => {
    getArtistName()
  },[artistProfileAddress])

  console.log(artistProfileAddress)

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
      {artistLoggedIn 
      ? 
      <h1 className='ArtistName'>{name}</h1>
      : 
      <Link
      className='Login' 
      to= "/Login"
      >
      Login
      </Link>
      }
      {artistLoggedIn 
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
      {artistLoggedIn 
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



/////figure out logged in conditions!