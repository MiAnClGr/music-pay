import React, {FC, useContext, ReactElement} from 'react'
import ArtistHeader from '../shared/ArtistHeader'
import ArtistContext from '../../Context/ArtistContext'
import {motion} from 'framer-motion'

const ArtistMain : FC = () : ReactElement => {

    const {artistLoggedIn, artistConnected} = useContext(ArtistContext)

    return (      
        <div
        style={{height: "100%"}}
        >
            <ArtistHeader/>
            {artistLoggedIn === false && artistConnected === false         
            ?           
            <motion.div 
            style= {{height: "100%", textAlign: 'center', marginTop: '280px'}}
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            exit= {{opacity: 0}} 
            transition={{duration: 0.2}}
            >
                <h3 
                className='Text'
                style= {{fontSize: '80px'}}
                >Welcome to Music-Pay for Artists
                </h3>
            </motion.div>
            :
            <></>
            }
        </div>
    )
}

export default ArtistMain
