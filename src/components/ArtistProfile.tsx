import React, {FC, MouseEventHandler, useState, useEffect} from 'react'
import {ethers, Contract} from 'ethers'
import {ArtistFactoryContract, signer, provider}from "../ContractObjects"
import ArtistProfileABI from '../ABI/ArtistProfile'



declare var window: any


const ArtistProfile :FC = () => {

    const [artistName, setArtistName] = useState("")
    const [artistAddress, setArtistAddress] = useState("")
    const [artistProfileAddress, setArtistProfileAddress] = useState("")


  

    const setArtist = async () => {
        ArtistFactoryContract.on("NewArtist", (newArtist) => {

            setArtistProfileAddress(newArtist)
            console.log(newArtist)
        })

        const ArtistProfileContract : Contract = 
            new ethers.Contract(artistProfileAddress, ArtistProfileABI, signer)
        console.log(ArtistProfileContract)      
            const artist = await ArtistProfileContract.artist()
        console.log(artist)
        if(artist == await signer.getAddress()){
            setArtistAddress(artist)
        }

        const name = await ArtistProfileContract.artistName()
        setArtistName(name)
    }

    useEffect(() => {
        setArtist()

    })


    return(
        <div
        className='ArtistProfile'>
            <h2>Artist Name: {artistName}</h2>
            <h2>Artist Address: {artistAddress}</h2>
            <h2>Artist Profile Address: {artistProfileAddress}</h2>

        </div>
    )
}

export default ArtistProfile