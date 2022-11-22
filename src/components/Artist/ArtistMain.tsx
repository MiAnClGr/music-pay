import React, {FC} from 'react'
import ArtistHeader from '../shared/ArtistHeader'

type props = {
    artistName : string
    artistProfileAddress : string
    artistLoggedIn : boolean
}

const ArtistMain : FC<props> = ({artistName, artistProfileAddress, artistLoggedIn}) => {

    return (
       
        <>
            <ArtistHeader
            artistName= {artistName}
            artistProfileAddress= {artistProfileAddress}
            artistLoggedIn= {artistLoggedIn}
            />
            <div style= {{textAlign: 'center', marginTop: '250px'}}>
                <h3 
                className='Text'
                style= {{fontSize: '60px'}}
                >Welcome to Music-Pay for Artists...
                </h3>
            </div>
        </>
    )
}

export default ArtistMain
