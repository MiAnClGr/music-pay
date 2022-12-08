import React, {FC, useContext, ReactElement} from 'react'
import {ethers} from 'ethers'
import ArtistHeader from '../shared/ArtistHeader'
import ArtistContext from '../../Context/ArtistContext'

type props = {
    artistAddress : string
    artistConnected : boolean
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    displayUpdateAboutMe : () => void
    displayBookings : () => void
    setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
    createArtistProfileInstance : (artist: string) => ethers.Contract 
}

const ArtistMain : FC<props> = ({
    artistAddress,
    artistConnected,  
    setArtistAddress,
    displayUpdateAboutMe, 
    displayBookings,
    setArtistConnected,
    createArtistProfileInstance
    }) : ReactElement => {

    const {artistProfileAddress, artistLoggedIn} = useContext(ArtistContext)

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
