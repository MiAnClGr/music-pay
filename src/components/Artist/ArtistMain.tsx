import React, {FC, useContext, ReactElement} from 'react'
import ArtistHeader from '../shared/ArtistHeader'
import ArtistContext from '../../Context/ArtistContext'

const ArtistMain : FC = () : ReactElement => {

    const {artistLoggedIn, artistConnected} = useContext(ArtistContext)

    return (      
        <>
            <ArtistHeader/>
            {artistLoggedIn === false && artistConnected === false         
            ?           
            <div style= {{textAlign: 'center', marginTop: '250px'}}>
                <h3 
                className='Text'
                style= {{fontSize: '60px'}}
                >Welcome to Music-Pay for Artists
                </h3>
            </div>
            :
            <></>
            }
        </>
    )
}

export default ArtistMain
