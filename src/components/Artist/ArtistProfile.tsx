import React, {FC, useEffect, useContext, ReactElement} from 'react'
import AboutMe from "./AboutMe"
import ArtistHeader from "../shared/ArtistHeader"
import BookingsList from "./BookingsList"
import ArtistContext from '../../Context/ArtistContext'
import {motion, AnimatePresence} from 'framer-motion'

const ArtistProfile :FC = () : ReactElement => {

    const {
        artistProfileAddress, 
        artistLoggedIn, 
        loginArtist,
        setArtist, 
        bookings,
        getBookings,
    } = useContext(ArtistContext)

    useEffect(() => {
        localStorage.setItem("bookings", JSON.stringify(bookings))
    },[bookings])

    useEffect(() => {
        loginArtist()
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
        <motion.div
        style={{height: "100%", overflow: "hidden"}}
        initial= {{opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}}
        transition={{duration: 0.2}}
        >
            <ArtistHeader/>      
            <div className='ProfilePage'>
                {artistLoggedIn 
                ?
                <AboutMe/>
                :
                <></>       
                }
                <AnimatePresence>
                    <BookingsList/>
                </AnimatePresence>
            </div>     
        </motion.div>
    )
}

export default ArtistProfile