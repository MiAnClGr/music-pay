import React, { ReactElement } from 'react'
import {useNavigate} from 'react-router-dom'
import Home from "../shared/Home"

const NotOwner = () : ReactElement => {

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