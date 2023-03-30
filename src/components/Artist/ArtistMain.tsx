import React, {FC, useContext, ReactElement} from 'react'
import ArtistHeader from './ArtistHeader'
import ArtistHeaderMobile from './Mobile/ArtistHeaderMobile'
import ArtistContext from '../../Context/ArtistContext'
import {motion} from 'framer-motion'
import LogOut from '../shared/LogOut'

/*
 * Artist users will be directed to this page if they don't yet have a profile.
 */

const ArtistMain : FC = () : ReactElement => {

    /// access context state variables 
    const {artistLoggedIn, artistConnected} = useContext(ArtistContext)

    /// if user is not logged in or connected to a profile, display welcome message

    return (      
        <motion.div
        style={{height: "100%", overflow: "hidden"}}
        initial= {{opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}} 
        transition={{duration: 0.2}}
        >
            <ArtistHeader/>
            <ArtistHeaderMobile/>
            {!artistLoggedIn && !artistConnected     
            ?           
            <motion.div 
            className='ArtistMain'
            >
                <h3 
                >Welcome to Music-Pay for Artists
                </h3>
            </motion.div>
            :
            <></>
            }
            {artistLoggedIn
            ?
            <LogOut/>
            :
            <></>   
            }
        </motion.div>
    )
}

export default ArtistMain
