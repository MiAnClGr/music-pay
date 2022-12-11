import React, { ReactElement } from 'react'
import Home from "../shared/Home"

const ProfileDoesNotExist = () : ReactElement => {

  return (
    <div className='LoadingScreen'>
        <h1 className='HeaderText'>
        This Profile does not exist    
        </h1>
        <br></br>
        <div className='HomeNotOwner'>
          <Home/>
        </div>
    </div>
  )
}

export default ProfileDoesNotExist