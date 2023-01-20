import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import AboutMe from "./AboutMe"
import ArtistHeader from "./ArtistHeader"
import ArtistContext from '../../Context/ArtistContext'
import {motion} from 'framer-motion'
import LogOut from '../shared/LogOut'
import ArtistInfo from './ArtistInfo'
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
        getProfilePicURL,
        updateClickedWhole,
        setUpdateClickedWhole,
        isHovering
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
            {isHovering
            ?
            <ArtistInfo/>
            :
            <></>
            }
            <motion.div 
            className='ProfilePage'
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            exit= {{opacity: 0}}
            >
                {artistLoggedIn 
                ?
                <button 
                className='UpdateButton'
                style={{
                    width: "5%",
                    marginLeft: "97%",
                    marginTop: "1%"
                }}
                onClick={() => setUpdateClickedWhole(!updateClickedWhole)}
                >
                    Edit
                </button>
                :
                <></>
                } 
                <div
                className='ProfilePageInner'
                >
                    <ProfilePicUpload/>
                    {artistLoggedIn 
                    ?
                    <AboutMe/>
                    :
                    <></>       
                    }
                </div>
                
            </motion.div>
            
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