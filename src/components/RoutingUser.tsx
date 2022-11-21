import React from 'react'
import {Link} from 'react-router-dom'

const RoutingUser = () => {
  return (
    <div className='TitlePage'>
        <h1 className='Music-Pay-Title'>Music-Pay</h1>
        <div className='Route'>
          <Link
          className='Link'
          to= "/Artist"
          >
          Artists
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <Link 
          className='Link'
          to= "/SearchArtist"
          >
          Booking Agents
          </Link>
        </div>
    </div>
  )
}

export default RoutingUser