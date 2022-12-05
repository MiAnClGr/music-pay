import React, {FC, ReactElement} from 'react'
import ArtistHeader from '../shared/ArtistHeader'

type props = {
    artistName : string
    artistAddress : string
    artistProfileAddress : string
    artistLoggedIn : boolean
    artistConnected : boolean
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    displayUpdateAboutMe : () => void
    displayBookings : () => void
    setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
}

const ArtistMain : FC<props> = ({
    artistName,
    artistAddress,
    artistProfileAddress,
    artistLoggedIn,
    artistConnected,  
    setArtistAddress,
    displayUpdateAboutMe, 
    displayBookings,
    setArtistConnected
    }) : ReactElement => {

    return (      
        <>
            <ArtistHeader
            artistName= {artistName}
            artistAddress= {artistAddress}
            artistProfileAddress= {artistProfileAddress}
            setArtistAddress= {setArtistAddress}
            artistLoggedIn= {artistLoggedIn}
            displayUpdateAboutMe= {displayUpdateAboutMe}
            displayBookings= {displayBookings}
            artistConnected= {artistConnected}
            setArtistConnected= {setArtistConnected}
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
