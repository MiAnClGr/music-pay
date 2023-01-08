import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import ArtistContext from '../../Context/ArtistContext'

const AboutMe : FC = () : ReactElement => {

    const {
        createArtistProfileInstance,
        artistProfileAddress,
        updateClicked,
        setUpdateClicked
    } = useContext(ArtistContext)

    
    const [update, setUpdate] = useState<string>("")
    const [aboutArtist, setAboutArtist] = useState<string>("")

    const getAboutMe = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const about = await artistProfileContract.aboutMe()
        console.log(about)
        setAboutArtist(about)
    }

    const updateAboutMe = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdate(e.target.value)
    }

    const handleSubmitAboutMe = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        
        try{
            const updated = await artistProfileContract.updateAboutMe(update)
            await updated.wait()
        }catch(error){

        }finally{
            getAboutMe()
            setUpdateClicked(!updateClicked)
            console.log("submitted")
        }
        
    }
 
    useEffect(() => {
        getAboutMe()
    },[])

  return (
    <div
    style={{
        width: "400px", 
        height: "500px", 
        display: "flex",
        flexDirection: "column",   
        }}
    >   
        <div className='AboutMeBox' >
            <h4 className='Text' style={{fontWeight: "bold"}}>ABOUT</h4>
            {!updateClicked
            ?
            <h4 style={{color: "white"}}>
                {aboutArtist}
            </h4>
            :
            <></> 
            }
            
            {updateClicked
            ?
            <div className='AboutMeUpdate'>
                <textarea
                className='AboutMeUpdateBox'
                style={{opacity: "0.7"}}
                placeholder='About...'
                onChange= {updateAboutMe}
                >
                    {aboutArtist}
                </textarea> 
            </div>          
            :
            <></>} 
        </div>
        <br></br>
        {updateClicked
        ?
        <button
        className='Submit'
        onClick={handleSubmitAboutMe}
        >
            Save    
        </button>  
        :
        <></>    
        }
    </div>
  )
}

export default AboutMe
