import React, { ReactElement } from 'react'
import {Link} from 'react-router-dom'

const Home = () : ReactElement => {

  return (
    <Link
    className='Home'
    to= "/RoutingUser"
    >
    Home
    </Link>
  )
}

export default Home
