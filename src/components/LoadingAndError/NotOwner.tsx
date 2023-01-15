import React, { ReactElement } from 'react'
import Home from "../shared/Home"

const NotOwner = () : ReactElement => {

  return (
    <div className='LoadingScreen'>
      <div 
      className='HomeNotOwner'
      style={{height: "80px", display: "flex", alignItems: "center"}}
      >
          <Home/>
        </div>
        <h1 
        className='HeaderText'
        style={{marginTop: "18%"}}
        >
        You are not the owner of this profile   
        </h1>
        <br></br>
        
    </div>
  )
}

export default NotOwner