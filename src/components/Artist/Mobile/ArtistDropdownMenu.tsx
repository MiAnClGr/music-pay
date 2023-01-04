import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '../../shared/Home'
import ArtistContext from '../../../Context/ArtistContext'
import {motion} from 'framer-motion'

const ArtistDropdownMenu = () => {

    const navigate = useNavigate()

    const {
        artistLoggedIn, 
        displayBookings,
        displayUpdateAboutMe
    } = useContext(ArtistContext)

  return (
    <motion.div
    className='ArtistDropdownMenu'
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    >
        
        <div className='DropdownItem'>
			<Home/>
        </div>
        
        <div 
        className='DropdownItem'
        onClick={() => navigate('/About')} 
        >
            <h4
            className='AboutMobile'
            >
            About
            </h4>
        </div>
        
        <div 
        className='DropdownItem' 
        onClick={() => navigate('/CreateNew')}
        >
            <h4
            className='CreateMobile'
            >
            Create
            </h4>
        </div>

        {artistLoggedIn 
        ?
        <div className='DropdownItem'>
            
            <h4  
            className='UpdateAboutMeMobile'
            onClick= {displayUpdateAboutMe} 
            >
                Update
            </h4>
        
        </div>
        :
        <></>
        }
        
        {artistLoggedIn 
        ?
        <div className='DropdownItem'>
            
            <h4
            className='DisplayBookingsMobile'
            onClick={displayBookings}
            >
                Bookings
            </h4>
        </div>
		:
        <></>
        }
    </motion.div>
  )
}

export default ArtistDropdownMenu