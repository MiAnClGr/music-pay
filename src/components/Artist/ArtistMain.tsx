import React, {FC} from 'react'
import { Contract } from 'ethers'
import ArtistHeader from '../shared/ArtistHeader'

type props = {
    artistName : string
    artistProfileAddress : string
    artistProfileContract : Contract | undefined
    artistLoggedIn : boolean
}

const ArtistMain : FC<props> = ({artistName, artistProfileAddress, artistProfileContract, artistLoggedIn}) => {

    return (
       
        <>
            <ArtistHeader
            artistName= {artistName}
            artistProfileAddress= {artistProfileAddress}
            artistProfileContract= {artistProfileContract}
            artistLoggedIn= {artistLoggedIn}
            />
            {!artistLoggedIn 
            
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
