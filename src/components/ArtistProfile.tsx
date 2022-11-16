import React, {FC, useState, useEffect} from 'react'
import {ethers, Contract} from 'ethers'
import {ArtistFactoryContract, signer}from "../ContractObjects"
import ArtistProfileABI from '../ABI/ArtistProfile'
import AboutMe from "./Artist/AboutMe"

declare var window: any

const ArtistProfile :FC = () => {

    const [artistName, setArtistName] = useState("")
    const [artistAddress, setArtistAddress] = useState("")
    const [artistProfileAddress, setArtistProfileAddress] = useState("")
    const [artistProfileContract, setArtistProfileContract] = useState<Contract>()

    const setArtistContract = async () => {
        ArtistFactoryContract.on("Artist", (artist, status) => {

            const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 

            setArtistProfileContract(ArtistProfileContract)
            setArtistProfileAddress(artist)
            console.log(artist)
            console.log(status)
        })
        
    }

    const setArtist = async () => {
        const artist = await artistProfileContract?.artist()
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
        <div>
            <div
            className='ArtistProfile'>
                
                <div>

                    <h5 className='Addresses'>Artist Address: {artistAddress}</h5>
                    <h5 className='Addresses'>Artist Profile Address: {artistProfileAddress}</h5>

                </div>

                <h1 className='ArtistName'>{artistName}</h1>
        </div>

            <AboutMe
            artistProfileContract = {artistProfileContract}
            />

        </div>
    )
}

export default ArtistProfile