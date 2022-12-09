import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import {ethers, Contract} from 'ethers'
import ArtistContext from '../../context/ArtistContext'

const AboutMe : FC = () : ReactElement => {

    const {
        updateAboutMe,
        handleSubmitAboutMe,
        updateClicked, 
        getAboutMe, 
        aboutArtist
    } = useContext(ArtistContext)
 
    useEffect(() => {
        getAboutMe()
    },[])

  return (
  
    <div className='AboutMe'>
        <div className='AboutMeBox' >
            <h4>
                {aboutArtist}
            </h4>
            <br></br>
            <br></br>
            
            <br></br>
            <br></br>
            {updateClicked
            ?
            <div className='AboutMeUpdate'>
                <textarea
                className='AboutMeUpdateBox'
                placeholder='About...'
                onChange= {updateAboutMe}
                onKeyDown= {handleSubmitAboutMe}
                >
                </textarea> 
            </div>          
            :
            <></>}       
        </div>
    </div>

  )
}

export default AboutMe
