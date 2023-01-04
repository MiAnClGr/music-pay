import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import ArtistDropdownMenu from './ArtistDropdownMenu'
import {Link} from 'react-router-dom'
import ArtistContext from '../../../Context/ArtistContext'
import { IoIosMenu } from 'react-icons/io'

const ArtistHeaderMobile : FC = () : ReactElement => {

		const {
			artistProfileAddress, 
			artistLoggedIn, 
			createArtistProfileInstance,
			getArtistConnected,
		} = useContext(ArtistContext)


		const [name, setName] = useState("")
        const [iconClicked, setIconClicked] = useState(false)

        const handleClick = () => {
            setIconClicked(!iconClicked)
        }


		const getArtistName = async () => {
			const artistProfile = createArtistProfileInstance(artistProfileAddress)
			const name = await artistProfile.artistName()
			console.log(name)
			setName(name)
		}

			useEffect(() => {
				getArtistConnected()
			},[artistLoggedIn])

			useEffect(() => {
				getArtistName()
			},[artistProfileAddress])

			console.log(artistProfileAddress)

		return(
			
			<header className='HeaderMobile'>
				
				<IoIosMenu
                className='ArtistDropdownIcon'
                onClick={handleClick}
                />

                {iconClicked
                ?
                <ArtistDropdownMenu/>
                :
                <></>
                }
				
				{artistLoggedIn 
				? 
				<h1 className='ArtistName'>{name}</h1>
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

export default ArtistHeaderMobile



/////figure out logged in conditions!