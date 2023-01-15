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
            className='ArtistPageInner'
            >
                 <div
                 className='ProfilePic'
                style={{
                    height: "500px",
                    width: "500px"
                
                }}
                >
                    <img 
                    src= {artistProfilePicURL} 
                    width= "100%" 
                    height= "100%" 
                    />
                </div>
                <div
                style={{
                    height: "500px",
                    width: "500px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"

                }}
                >
                    <h2 className='Text' style={{
                        fontSize: "35px", 
                        fontWeight: "bold", 
                        marginTop: 0,
                        marginBottom: "20px",
                        backgroundColor: "black",
                        display: "inline",
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: "10px",
                        borderRadius: "10px"
                        }}>{artistName}
                    </h2>
                    <div
                    className='AboutMeBox'
                    style={{
                        width: "460px", 
                        height: "425px",
                        padding: "20px"
                    }}
                    >
                        <h4 className='Text'>{artistAboutMe}</h4>
                    </div>
                    
                </div>
                
               
            </div>
            <br></br>
            <button 
            className='BookArtistButton'
            onClick={() => navigate("/ArtistBooking")}
            >BOOK {artistName}
            </button>
            
        </div>
    </div>
  )
}

export default ArtistPage