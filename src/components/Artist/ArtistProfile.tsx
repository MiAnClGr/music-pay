import React, {FC, useState, useEffect, ReactElement} from 'react'
import {ethers, utils, Contract} from 'ethers'
import {ArtistFactoryContract, signer}from "../../Contracts/ContractObjects"
import ArtistProfileABI from '../../ABI/ArtistProfile'
import AboutMe from "./AboutMe"
import ArtistHeader from "../shared/ArtistHeader"
import BookingsList from "./BookingsList"

type props = {
    artistName : string
    artistProfileAddress : string
    artistAddress : string 
    artistProfileContract : Contract | undefined
    artistLoggedIn : boolean
    setArtistName : React.Dispatch<React.SetStateAction<string>>
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistProfileAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistProfileContract : React.Dispatch<React.SetStateAction<Contract | undefined>>
    setArtistLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
    clicked : boolean
    setClicked : React.Dispatch<React.SetStateAction<boolean>>
    openInput : () => void
    setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
    artistConnected : boolean

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
    setArtistLoggedIn,
    clicked,
    setClicked,
    setArtistConnected,
    artistConnected,
    openInput}) : ReactElement => {

    const [bookings, setBookings] = useState<any[]>([])
  
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
        console.log(artistProfileContract)
        setArtistName(name)
    } 

    const getBookings = async () => {
        let bookingsArray : React.SetStateAction<any[]> = []
        for(let i = 0; i < 5; i++){
            const booking = await artistProfileContract?.bookings(i)
            bookingsArray.push(booking)
        }
        setBookings(bookingsArray[0])
        
        console.log(bookingsArray[0])
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
        getBookings()
    }, [artistProfileContract])


    console.log(artistAddress)


    return(
        <div className='Align-Profile'>
            <ArtistHeader
            artistName= {artistName}
            artistAddress= {artistAddress}
            setArtistAddress= {setArtistAddress}
            artistProfileAddress = {artistProfileAddress}
            artistProfileContract= {artistProfileContract}
            setArtistProfileContract= {setArtistProfileContract}
            artistLoggedIn= {artistLoggedIn}
            setArtistLoggedIn= {setArtistLoggedIn}
            openInput= {openInput}
            artistConnected= {artistConnected}
            setArtistConnected= {setArtistConnected}
            />
            {artistLoggedIn && artistConnected
            ?
            <AboutMe
            artistProfileContract={artistProfileContract}
            setClicked= {setClicked}
            clicked= {clicked}
            />
            :
            <></>       
            }

            <h1
            className='Text'
            onClick={getBookings}
            >bookings</h1>
            <div>
                <BookingsList
                bookings= {bookings}
                />
            </div>
           
        </div>
    )
}

export default ArtistProfile