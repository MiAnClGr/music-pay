import React, {FC, useState} from 'react'
import ArtistProfileHeader from '../shared/ArtistHeader'
import {Contract} from 'ethers'



type props = {
    artistName : string
    artistProfileAddress : string
    ArtistFactoryContract : Contract
    artistLoggedIn : boolean
    setArtistLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}

const ArtistMain : FC<props> = ({artistName, artistProfileAddress, ArtistFactoryContract, artistLoggedIn, setArtistLoggedIn}) => {

   


    return (
       
        <>
            <ArtistProfileHeader
            artistName= {artistName}
            artistProfileAddress= {artistProfileAddress}
            artistLoggedIn= {artistLoggedIn}
            setArtistLoggedIn= {setArtistLoggedIn}
            />
            <div style= {{textAlign: 'center', marginTop: '250px'}}>
                <h3 
                className='Text'
                style= {{fontSize: '60px'}}
                >Welcome to Music-Pay for Artists...</h3>
            </div>
        </>
    )
}

export default ArtistMain



///TO FIX 

///profile gets created and the profile address is passed to ArtistProfile and then artist name is retreived from ArtistProfile
///contract to be displayed in artist profile but Routes need to be in the same place 
/// need to figure out routes better
///