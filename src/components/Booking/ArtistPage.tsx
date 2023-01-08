import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router'
import ArtistContext from '../../Context/ArtistContext'
import BookingContext from '../../Context/BookingContext'
import BookingHeader from './BookingHeader'

const ArtistPage = () => {

    const navigate = useNavigate()

    const {
        searchedAddress, 
        artistName,
        getArtistName
    } = useContext(BookingContext)

    const {createArtistProfileInstance} = useContext(ArtistContext)

    const [artistProfilePicURL, setArtistProfilePicURL] = useState<string>("")
    const [artistAboutMe, setArtistAboutMe] = useState<string>("")

    const getProfilePicURL = async () => {
        const artistProfileContract = createArtistProfileInstance(searchedAddress)
        const url = await artistProfileContract.profilePicURL()
        setArtistProfilePicURL(url)
    }

    const getAboutMe = async () => {
        const artistProfileContract = createArtistProfileInstance(searchedAddress)
        const about = await artistProfileContract.aboutMe()
        console.log(about)
        setArtistAboutMe(about)
    }

    useEffect(() => {
      getArtistName()
      getProfilePicURL()
      getAboutMe()
    }, [searchedAddress])
    


  return (
    <div
    style={{height: "100%", width: "100%"}}
    >
        <BookingHeader/>
        <div
        className='ArtistPage'
        style={{
            paddingTop: "25px",
            paddingBottom: "25px"   
        }}
        >
            <div
            style={{
                height: "450px", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                gap: "5%",
            }}
            >
                 <div
                style={{
                    height: "400px",
                    width: "400px",
                    left: "10%",
                }}
                >
                    <img 
                    src= {artistProfilePicURL} 
                    width= "98%" 
                    height= "98%" 
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        border: "solid 1px #191919"
                    }}/>
                </div>
                <div
                style={{
                    height: "400px",
                    width: "400px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"

                }}
                >
                    <div>
                        <h3 
                        className='ArtistNameBooking'
                        style={{
                            fontSize: "60px"
                        }}
                        >{artistName}
                        </h3>
                        <h4 className='Text'>{artistAboutMe}</h4>
                    </div>
                    <h4 
                    className='HeaderMenuTitle'
                    style={{
                        width: "30%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "5%",
                        textAlign: "center",
                        border: "solid 1px grey",
                        padding: "10px",
                        borderRadius: "20px",
                        fontSize: "20px"
                    }}
                    onClick={() => navigate("/ArtistBooking")}
                    >BOOK {artistName}
                    </h4>
                </div>
                
               
            </div>
            <br></br>
            
        </div>
    </div>
  )
}

export default ArtistPage