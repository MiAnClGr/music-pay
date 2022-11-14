import React from 'react'
import {useNavigate} from 'react-router-dom'

const RoutingUser = () => {

const navigate = useNavigate()

  const toCreateArtist = () => {
    navigate("/CreateArtist")
  }

  const toSearchArtist = () => {
    navigate("/SearchArtist")
  }

  return (
    <div>
        <button 
        className='Submit'
        onClick={toCreateArtist}
        >
        Artists
        </button>
        <br></br>
        <br></br>
        <button 
        className='Submit'
        onClick={toSearchArtist}
        >
        Booking Agents
        </button>
    </div>
  )
}

export default RoutingUser