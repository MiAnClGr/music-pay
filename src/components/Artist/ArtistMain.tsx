import React, {FC, useEffect} from 'react'
import { Contract } from 'ethers'
import ArtistHeader from '../shared/ArtistHeader'

type props = {
    artistName : string
    artistAddress : string
    artistLoggedIn : boolean
    artistConnected : boolean
    artistProfileAddress : string
    artistProfileContract : Contract | undefined
    setArtistProfileContract : React.Dispatch<React.SetStateAction<Contract | undefined>>
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistLoggedIn :  React.Dispatch<React.SetStateAction<boolean>>
    openInput : () => void
    
    setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
}

const ArtistMain : FC<props> = ({
    artistName,
    artistAddress,
    artistLoggedIn,
    artistConnected,  
    artistProfileAddress, 
    artistProfileContract,
    setArtistProfileContract, 
    setArtistAddress,
    setArtistLoggedIn, 
    openInput, 
     
    setArtistConnected}) => {

    return (
       
        <>
            <ArtistHeader
            artistName= {artistName}
            artistAddress= {artistAddress}
            setArtistAddress= {setArtistAddress}
            artistProfileAddress= {artistProfileAddress}
            artistProfileContract= {artistProfileContract}
            setArtistProfileContract= {setArtistProfileContract}
            artistLoggedIn= {artistLoggedIn}
            setArtistLoggedIn= {setArtistLoggedIn}
            openInput= {openInput}
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
