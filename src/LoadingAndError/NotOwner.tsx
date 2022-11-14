import React from 'react'
import {useNavigate} from 'react-router-dom'

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
        <button className='Back' onClick= {back}>Back</button>
    </div>
  )
}

export default NotOwner