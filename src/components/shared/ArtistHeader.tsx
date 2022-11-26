import React, {FC, ReactElement, useState} from 'react'
import { Contract } from 'ethers'
import { Link } from 'react-router-dom'
import AboutMe from '../Artist/AboutMe'
import Home from "./Home"

type props = {
  artistName : string
  artistProfileAddress : string
  artistLoggedIn : boolean
  artistProfileContract : Contract | undefined
}
const ArtistHeader : FC<props> = ({artistName, artistProfileContract, artistLoggedIn}) : ReactElement => {
  
  const [clicked, setClicked] = useState(false)

  const openinput = () => {
    setClicked(!clicked)
}

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
      <h1 className='ArtistName'>{artistName}</h1>
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
      onClick= {openinput} 
      >
        Update
      </h4>

      :

      <></>
      }
      <AboutMe
      artistProfileContract={artistProfileContract}
      setClicked= {setClicked}
      clicked= {clicked}
      />
    </header>
  )
}

export default ArtistHeader