import React, {createContext, useState, ReactNode} from 'react'
import {ArtistFactoryContract, signer} from '../Contracts/ContractObjects'

interface ArtistContextInterface {
    artistProfileAddress : string
    setArtistProfileAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistContract : () => Promise<void>
    artistLoggedIn : boolean
}


const ArtistContext = createContext<ArtistContextInterface>({} as ArtistContextInterface)

export const ArtistProvider  = ({children} : {children : ReactNode}) => {

    const [artistProfileAddress, setArtistProfileAddress] = useState<string>("")
    const [artistLoggedIn, setArtistLoggedIn] = useState<boolean>(false)

    const setArtistContract = async () => {
        const owner = await signer.getAddress()
        const artist = await ArtistFactoryContract.ownerToArtist(owner)
        setArtistProfileAddress(artist)
        setArtistLoggedIn(true)
    } 

    return(
        <ArtistContext.Provider
        value= {{
            artistProfileAddress,
            setArtistProfileAddress,
            setArtistContract,
            artistLoggedIn
        }}
        >
            {children}
        </ArtistContext.Provider>
    ) 
    

}

export default ArtistContext