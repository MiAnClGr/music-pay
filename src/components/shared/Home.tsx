import React, { ReactElement } from 'react'
import {Link} from 'react-router-dom'

const Home = () : ReactElement => {

  return (
    <Link
    className='Home'
    to= "/RoutingUser"
    >
    MUSIC-PAY
    </Link>
  )
}

export default Home
