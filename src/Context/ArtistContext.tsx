import React, {createContext, useState, ReactNode} from 'react'
import {ethers, Contract} from 'ethers'
import {ArtistFactoryContract, signer} from '../contracts/ContractObjects'
import ArtistProfileABI from '../ABI/ArtistProfile'

interface ArtistContextInterface {
    artistAddress : string
    artistProfileAddress : string
    setArtistContract : () => Promise<void>
    setArtist : () => Promise<void>
    artistLoggedIn : boolean
    artistConnected : boolean
    createArtistProfileInstance : (artist: string) => ethers.Contract
    getArtistConnected : () => Promise<void>
}


const ArtistContext = createContext<ArtistContextInterface>({} as ArtistContextInterface)

export const ArtistProvider  = ({children} : {children : ReactNode}) => {

    const [artistAddress, setArtistAddress] =  useState<string>("")
    const [artistProfileAddress, setArtistProfileAddress] = useState<string>("")
    const [artistLoggedIn, setArtistLoggedIn] = useState<boolean>(false)
    const [artistConnected, setArtistConnected] = useState<boolean>(false)

    const setArtistContract = async () => {
        const owner = await signer.getAddress()
        const artist = await ArtistFactoryContract.ownerToArtist(owner)
        setArtistProfileAddress(artist)
        setArtistLoggedIn(true)
    } 

    const setArtist = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const artist = await artistProfileContract.artist()
        console.log(artist)
        if(artist == await signer.getAddress()){
            console.log(await signer.getAddress())
            setArtistAddress(artist)
        } 
    } 

    const createArtistProfileInstance = (artist : string) => {
        const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 
    
        return ArtistProfileContract
    }

    const getArtistConnected = async () => {
        try{
            if(artistAddress == await signer.getAddress()){
                console.log(await signer.getAddress())
                console.log(artistAddress)
                setArtistConnected(true)
                console.log(artistConnected)
                console.log(artistLoggedIn)
            }else{
                setArtistConnected(false)
                setArtistAddress("")
            }
        }catch(e){
            setArtistConnected(false)
        }
    }

    

    return(
        <ArtistContext.Provider
        value= {{
            artistAddress,
            artistProfileAddress,
            setArtistContract,
            setArtist,
            artistLoggedIn,
            artistConnected,
            createArtistProfileInstance,
            getArtistConnected
        }}
        >
            {children}
        </ArtistContext.Provider>
    ) 
    

}

export default ArtistContext