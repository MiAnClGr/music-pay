import React, {FC, ReactElement} from 'react'
import {ethers} from 'ethers'
import ArtistHeader from '../shared/ArtistHeader'

type props = {
    artistAddress : string
    artistProfileAddress : string
    artistLoggedIn : boolean
    artistConnected : boolean
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    displayUpdateAboutMe : () => void
    displayBookings : () => void
    setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
    createArtistProfileInstance : (artist: string) => ethers.Contract 
}

const ArtistMain : FC<props> = ({
    artistAddress,
    artistProfileAddress,
    artistLoggedIn,
    artistConnected,  
    setArtistAddress,
    displayUpdateAboutMe, 
    displayBookings,
    setArtistConnected,
    createArtistProfileInstance
    }) : ReactElement => {

    return (      
        <>
            <ArtistHeader
            artistAddress= {artistAddress}
            artistProfileAddress= {artistProfileAddress}
            setArtistAddress= {setArtistAddress}
            artistLoggedIn= {artistLoggedIn}
            displayUpdateAboutMe= {displayUpdateAboutMe}
            displayBookings= {displayBookings}
            artistConnected= {artistConnected}
            setArtistConnected= {setArtistConnected}
            createArtistProfileInstance= {createArtistProfileInstance}
            />
            {artistLoggedIn === false && artistConnected === false         
            ?           
            <div style= {{textAlign: 'center', marginTop: '250px'}}>
                <h3 
                className='Text'
                style= {{fontSize: '60px'}}
                >Welcome to Music-Pay for Artists...
                </h3>
            </div>
            :
            <></>
            }
        </>
    )
}

export default ArtistMain
