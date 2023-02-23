import React from 'react'
import { Link } from 'react-router-dom'

const MetamaskNotDetected = () => {
  return (
    <div 
    className='LoadingScreen'
    style={{marginTop: "18%"}}
    >
      <h1 className='HeaderText'>Please install Metamask to continue</h1>
      <br></br>
      <br></br>
      <button 
      className='Submit' 
      style={{width: "200px", fontSize: "16px"}}
      onClick={() => { window.location.href =' https://metamask.io/download/'}}
      > Install</button>
      <br></br>
      <br></br>
      <Link
      to={"/"}
      className= 'Link'
      >
      Back
      </Link>

    </div>
  )
}

export default MetamaskNotDetected