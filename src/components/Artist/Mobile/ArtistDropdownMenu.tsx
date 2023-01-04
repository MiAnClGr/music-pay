import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import Home from '../../shared/Home'
import ArtistContext from '../../../Context/ArtistContext'

const ArtistDropdownMenu = () => {

    const {
        artistLoggedIn, 
        displayBookings,
        displayUpdateAboutMe
    } = useContext(ArtistContext)

  return (
    <div
    className='ArtistDropdownMenu'
    >
        <br></br>
        <div className='HomeHeaderMobile'>
			<Home/>
        </div>
        <br></br>
        <Link
        className='AboutMobile' 
        to= "/About"
        >
        About
        </Link>
        <br></br>
        <Link
        className='CreateMobile' 
        to= "/CreateNew"
        >
        Create
        </Link>
        <br></br>
        {artistLoggedIn 
        ?
        <h4  
        className='UpdateAboutMeMobile'
        onClick= {displayUpdateAboutMe} 
        >
            Update
        </h4>
        :
        <></>
        }
        {artistLoggedIn
        ?
        <br></br>
        :
        <></>
        }
        {artistLoggedIn 
        ?
        <h4
        className='DisplayBookingsMobile'
        onClick={displayBookings}
        >
            Bookings
        </h4>
        :
        <></>
        }
        {artistLoggedIn
        ?
        <br></br>
        :
        <></>
        }
		
    </div>
  )
}

export default ArtistDropdownMenu