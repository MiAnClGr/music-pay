import React, {FC, useEffect, useContext, ReactElement} from 'react'
import AboutMe from "./AboutMe"
import ArtistHeader from "./ArtistHeader"
import BookingsList from "./BookingsList"
import ArtistContext from '../../Context/ArtistContext'
import {motion, AnimatePresence} from 'framer-motion'
import LogOut from '../shared/LogOut'
import ProfilePicUpload from './ProfilePicUpload'
import ArtistHeaderMobile from './Mobile/ArtistHeaderMobile'


const ArtistProfile :FC = () : ReactElement => {

    const {
        artistProfileAddress, 
        artistLoggedIn, 
        loginArtist,
        setArtist, 
        bookings,
        getBookings,
        getProfilePicURL
    } = useContext(ArtistContext)

    console.log(artistProfileAddress)

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
        getProfilePicURL()
        console.log("useEffect 2")
    }, [artistProfileAddress])

    useEffect(() => {
        localStorage.setItem("artistProfileAddress", artistProfileAddress)
        console.log("useEffect 3")
    },[artistProfileAddress])

    return(
        <div
        style={{height: "100%"}}
        
        >
            <ArtistHeader/>   
            <ArtistHeaderMobile/>   
            <motion.div 
            className='ProfilePage'
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            exit= {{opacity: 0}}
            >
                {artistLoggedIn 
                ?
                <AboutMe/>
                :
                <></>       
                }
                
            </motion.div>
            <ProfilePicUpload/>
            {artistLoggedIn
            ?
            <LogOut/>
            :
            <></>   
            }
        </div>
    )
}

export default ArtistProfile