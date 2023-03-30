import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Home from "../shared/Home"
import ArtistContext from '../../Context/ArtistContext'

/**
 * The ArtistHeader component will display the artist's name and allow them to navigate to the CreateNew and About pages.
 * It is displayed on every page of the artists section.
 */

const ArtistHeader : FC = () : ReactElement => {

	const navigate = useNavigate()
	
		// access context states and functions
		const {
			artistProfileAddress, 
			artistLoggedIn, 
			createArtistProfileInstance,
			getArtistConnected,
			handleMouseOver
		} = useContext(ArtistContext)

		// state variables
		const [name, setName] = useState("")

		// fetches artist name from contract
		const getArtistName = async () => {
			const artistProfile = createArtistProfileInstance(artistProfileAddress)
			const name = await artistProfile.artistName()
			console.log(name)
			setName(name)
		}


		/// calls getArtistConnected and getArtistName on load

		useEffect(() => {
			getArtistConnected()
		},[artistLoggedIn])

		useEffect(() => {
			getArtistName()
		},[artistProfileAddress])

		return(
			
			<header className='Header'>

				<Home/>
				
				<div
				className='HeaderMenu'
				>
					
					<Link
					className='HeaderMenuTitle' 
					to= "/About"
					>
					About
					</Link>
					<Link
					className='HeaderMenuTitle' 
					to= "/CreateNew"
					>
					Create
					</Link>
					{artistLoggedIn 
					?
					<h4
					className='HeaderMenuTitle'
					onClick={()=> navigate("/BookingsList")}
					>
						Bookings
					</h4>
					:
					<></>
					}
					<Link
					className='HeaderMenuTitle' 
					to= "/Contact"
					>
					Contact
					</Link>
				</div>
				

				{artistLoggedIn 
				? 
				<h1 className='ArtistName'
				onClick={() => navigate("/ArtistProfile")}
				onMouseOver = {handleMouseOver}
				>{name}</h1>
				: 
				<Link
				className='Login' 
				style={{fontSize: "15px"}}
				to= "/Login"
				>
				LOG IN
				</Link>
				}
			</header>
		)
}

export default ArtistHeader



/////figure out logged in conditions!