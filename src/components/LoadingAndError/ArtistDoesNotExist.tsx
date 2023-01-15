import React, { ReactElement } from 'react'
import Home from '../shared/Home'

const ArtistDoesNotExist = () : ReactElement => {
  return (
    <div 
    className= "LoadingScreen"
    >
        <div 
        style={{height: "80px", display: "flex", alignItems: "center"}}
        >
            <Home/>
        </div>
        <h1 
        className='HeaderText'
        style={{marginTop: "18%"}}
        >This Artist does not exist</h1>
    </div>
  )
}

export default ArtistDoesNotExist
