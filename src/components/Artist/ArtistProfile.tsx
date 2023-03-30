import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import AboutMe from "./AboutMe"
import ArtistHeader from "./ArtistHeader"
import ArtistContext from '../../Context/ArtistContext'
import {motion} from 'framer-motion'
import LogOut from '../shared/LogOut'
import ArtistInfo from './ArtistInfo'
import ProfilePicUpload from './ProfilePicUpload'
import ArtistHeaderMobile from './Mobile/ArtistHeaderMobile'

/*
 * The profile page of the artist user. Containing the about me and profile pic upload components.
 */

const ArtistProfile :FC = () : ReactElement => {

    /// access context state variables and functions
    const {
        artistProfileAddress, 
        artistLoggedIn, 
        loginArtist,
        setArtist, 
        getBookings,
        getProfilePicURL,
        updateClickedWhole,
        setUpdateClickedWhole,
        isHovering
    } = useContext(ArtistContext)

    /// login artist on page load
    useEffect(() => {
        loginArtist()
    }, [])

    /// set artist get bookings and get profile pic url when artist profile address changes
    useEffect(() => {
        setArtist()
        getBookings()
        getProfilePicURL()
    }, [artistProfileAddress])


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