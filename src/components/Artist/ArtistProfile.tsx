import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import {ethers} from 'ethers'
import {signer}from "../../Contracts/ContractObjects"
import AboutMe from "./AboutMe"
import ArtistHeader from "../shared/ArtistHeader"
import BookingsList from "./BookingsList"
import ArtistContext from '../../Context/ArtistContext'

type props = {
    artistAddress : string 
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    updateClicked : boolean
    setUpdateClicked : React.Dispatch<React.SetStateAction<boolean>>
    setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
    artistConnected : boolean
    displayUpdateAboutMe : () => void
    displayBookings :  () => void
    updateDisplayBookings : boolean
    createArtistProfileInstance : (artist: string) => ethers.Contract
    setBookingNumber : React.Dispatch<React.SetStateAction<string>>
}

const ArtistProfile :FC<props> = ({
    artistAddress,
    setArtistAddress, 
    updateClicked,
    setUpdateClicked,
    setArtistConnected,
    artistConnected,
    displayUpdateAboutMe,
    displayBookings,
    updateDisplayBookings,
    createArtistProfileInstance,
    setBookingNumber,
    }) : ReactElement => {

    const [bookings, setBookings] = useState<any[]>([]) ///JSON.parse(localStorage.getItem("bookings")!)
   
    const {artistProfileAddress, artistLoggedIn, setArtistContract} = useContext(ArtistContext)

    const setArtist = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const artist = await artistProfileContract.artist()
        console.log(artist)
        if(artist == await signer.getAddress()){
            console.log(await signer.getAddress())
            setArtistAddress(artist)
        } 
    } 

    const getBookings = async () => {
        console.log("clicked")
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        let bookingsArray : any[] =  []
        for(let i = 0; i < 5; i++){
            const booking : any[] = await artistProfileContract.getBooking(i)
            if(booking[5] != "0x0000000000000000000000000000000000000000"){
                bookingsArray.push(booking)
            }
        }
        setBookings(bookingsArray)
    }

    useEffect(() => {
        localStorage.setItem("bookings", JSON.stringify(bookings))
    },[bookings])

    useEffect(() => {
        setArtistContract()
        console.log("useEffect 1")
    }, [])

    useEffect(() => {
        setArtist()
        getBookings()
        console.log("useEffect 2")
    }, [artistProfileAddress])

    useEffect(() => {
        localStorage.setItem("artistProfileAddress", artistProfileAddress)
        console.log("useEffect 3")
    },[artistProfileAddress])

    return(
        <div>
            <ArtistHeader
            artistAddress= {artistAddress}
            artistProfileAddress= {artistProfileAddress}
            setArtistAddress= {setArtistAddress}
            artistLoggedIn= {artistLoggedIn}
            displayUpdateAboutMe= {displayUpdateAboutMe}    
            displayBookings= {displayBookings}
            artistConnected= {artistConnected}
            setArtistConnected= {setArtistConnected}
            createArtistProfileInstance= {createArtistProfileInstance}
            />      
            <div className='ProfilePage'>
                {artistLoggedIn 
                ?
                <AboutMe
                createArtistProfileInstance= {createArtistProfileInstance}
                artistProfileAddress= {artistProfileAddress}
                setUpdateClicked= {setUpdateClicked}
                updateClicked= {updateClicked}
                />
                :
                <></>       
                }
                <BookingsList
                bookings= {bookings}
                updateDisplayBookings= {updateDisplayBookings}
                setBookingNumber= {setBookingNumber}
                createArtistProfileInstance= {createArtistProfileInstance}
                artistProfileAddress= {artistProfileAddress}
            
                />
            </div>     
        </div>
    )
}

export default ArtistProfile