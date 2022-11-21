import React, {FC, useState, useEffect} from 'react'
import {ethers, Contract} from 'ethers'
import {ArtistFactoryContract, signer}from "../../Contracts/ContractObjects"
import ArtistProfileABI from '../../ABI/ArtistProfile'
import AboutMe from "./AboutMe"
import Home from "../shared/Home"
import ArtistHeader from "../shared/ArtistHeader"

type props = {
    artistName : string
    artistProfileAddress : string
    artistAddress : string | undefined
    artistProfileContract : Contract | undefined
    artistLoggedIn : boolean
    setArtistName : React.Dispatch<React.SetStateAction<string>>
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistProfileAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistProfileContract : React.Dispatch<React.SetStateAction<Contract | undefined>>
    setArtistLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}

const ArtistProfile :FC<props> = 
    ({artistName,
    artistProfileAddress, 
    artistAddress, 
    artistProfileContract,
    artistLoggedIn, 
    setArtistName, 
    setArtistAddress, 
    setArtistProfileAddress, 
    setArtistProfileContract,
    setArtistLoggedIn}) => {

    const setArtistContract = async () => {
        ArtistFactoryContract.on("Artist", (artist, status) => {
            console.log("set")

            createInstance(artist)
            setArtistProfileAddress(artist)
            setArtistLoggedIn(true)
            console.log(artist)
            console.log(status)
        })
        
    }

    const createInstance = (artist : string) => {
        const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 

            setArtistProfileContract(ArtistProfileContract)
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
        localStorage.setItem("artistProfileAddress", artistProfileAddress)
    },[artistProfileAddress])

    useEffect(() => {
        localStorage.setItem("artistName", artistName)
    },[artistName])

    useEffect(() => {
        setArtistContract()
    }, [])

    useEffect(() => {
        setArtist()
    }, [artistProfileContract])


    return(
        <div className='Align-Profile'>
            <ArtistHeader
            artistName= {artistName}
            artistProfileAddress = {artistProfileAddress}
            artistLoggedIn= {artistLoggedIn}
            setArtistLoggedIn= {setArtistLoggedIn}
            />
            {/* <div
            className='ArtistProfile'>

                <h1 className='ArtistName'>{artistName}</h1>
                
                <div className='Addresses'>

                    <h5>{artistProfileAddress}</h5>

                </div>

                
            </div> */}

            <AboutMe
            artistProfileContract = {artistProfileContract}
            />
          

        </div>
    )
}

export default ArtistProfile