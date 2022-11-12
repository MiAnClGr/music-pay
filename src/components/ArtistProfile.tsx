import React, {FC, useState, useEffect} from 'react'
import {ethers, Contract} from 'ethers'
import {ArtistFactoryContract, signer, provider}from "../ContractObjects"
import ArtistProfileABI from '../ABI/ArtistProfile'



declare var window: any



const ArtistProfile :FC = () => {

    const [artistName, setArtistName] = useState("")
    const [artistAddress, setArtistAddress] = useState("")
    const [artistProfileAddress, setArtistProfileAddress] = useState("")
    const [artistProfileContract, setArtistProfileContract] = useState<Contract>()

    const setArtistContract = async () => {
        ArtistFactoryContract.on("Artist", async (artist, status) => {

            const ArtistProfileContract : Contract = 
            new ethers.Contract(artist, ArtistProfileABI, signer) 

            setArtistProfileContract(ArtistProfileContract)
            setArtistProfileAddress(artist)
            console.log(artist)
            console.log(status)
        })
        
    }

    const setArtist = async () => {
        const artist = await artistProfileContract?.artist()
        console.log(artistProfileContract)
        if(artist == await signer.getAddress()){
            setArtistAddress(artist)
        }

        const name = await artistProfileContract?.artistName()
        console.log(name)
        setArtistName(name)
    }

    useEffect(() => {
        setArtistContract()

    }, [])

    useEffect(() => {
        setArtist()
    }, [artistProfileContract])


    return(
        <div
        className='ArtistProfile'>
            
            <div>

                <h6 className='Addresses'>Artist Address: {artistAddress}</h6>
                <h6 className='Addresses'>Artist Profile Address: {artistProfileAddress}</h6>

            </div>

            <h1 className='ArtistName'>{artistName}</h1>

        </div>
    )
}

export default ArtistProfile