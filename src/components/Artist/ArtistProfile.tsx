import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import AboutMe from "./AboutMe"
import ArtistHeader from "../shared/ArtistHeader"
import BookingsList from "./BookingsList"
import ArtistContext from '../../context/ArtistContext'

const ArtistProfile :FC = () : ReactElement => {

    const {
        artistProfileAddress, 
        artistLoggedIn, 
        setArtistContract,
        setArtist, 
        createArtistProfileInstance,
        bookings,
        getBookings,

    } = useContext(ArtistContext)

  

    

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
            <ArtistHeader/>      
            <div className='ProfilePage'>
                {artistLoggedIn 
                ?
                <AboutMe/>
                :
                <></>       
                }
                <BookingsList/>
            </div>     
        </div>
    )
}

export default ArtistProfile