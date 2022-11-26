import React from 'react'
import {useNavigate} from 'react-router-dom'
import Home from "../shared/Home"

const NotOwner = () => {

  const navigate = useNavigate()

  const back = () => {
    navigate("/CreateArtist")
  }

  return (
    <div className='LoadingScreen'>
        <h1 className='HeaderText'>
        You are not the owner of this profile :(    
        </h1>
        <br></br>
        <div className='HomeNotOwner'>
          <Home/>
        </div>
    </div>
  )
}

export default NotOwner