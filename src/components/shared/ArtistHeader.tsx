import React, {FC, ReactElement} from 'react'
import { Link } from 'react-router-dom'
import Home from "./Home"

type props = {
  artistName : string
  artistProfileAddress : string
  artistLoggedIn : boolean
}
const ArtistHeader : FC<props> = ({artistName, artistProfileAddress, artistLoggedIn}) : ReactElement => {
  
  return(
    
    <header className='Header'>
      <Home/>
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
      {artistLoggedIn ? <h1 className='ArtistName'>{artistName}</h1>
      : 
      <Link
      className='Login' 
      to= "/Login"
      >
      Login
      </Link>
      }
     
    </header>
  )
}

export default ArtistHeader