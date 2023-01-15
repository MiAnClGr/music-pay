import React, { ReactElement } from 'react'
import Home from "../shared/Home"

const ProfileDoesNotExist = () : ReactElement => {

  return (
    <div className='LoadingScreen'>
      <div 
      style={{height: "80px", display: "flex", alignItems: "center"}}
      >
          <Home/>
      </div>
      <h1 
      className='HeaderText'
      style={{marginTop: "18%"}}
      >
      This Profile does not exist    
      </h1>
      <br></br>
        
    </div>
  )
}

export default ProfileDoesNotExist