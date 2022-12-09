import React, {FC, useContext, ReactElement} from 'react'
import ArtistHeader from '../shared/ArtistHeader'
import ArtistContext from '../../context/ArtistContext'

type props = {
    displayUpdateAboutMe : () => void
    displayBookings : () => void
}

const ArtistMain : FC<props> = ({
    displayUpdateAboutMe, 
    displayBookings,
    }) : ReactElement => {

    const {artistLoggedIn, artistConnected} = useContext(ArtistContext)

    return (      
        <>
            <ArtistHeader
            displayUpdateAboutMe= {displayUpdateAboutMe}
            displayBookings= {displayBookings}
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
