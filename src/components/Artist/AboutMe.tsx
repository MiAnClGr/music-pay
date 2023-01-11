import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import ArtistContext from '../../Context/ArtistContext'

const AboutMe : FC = () : ReactElement => {

    const {
        createArtistProfileInstance,
        artistProfileAddress,
        updateClickedAbout,
        setUpdateClickedAbout
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
            setUpdateClickedAbout(!updateClickedAbout)
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
        {!updateClickedAbout
        ?
            <div 
            className='AboutMeBox'
            onClick={() => setUpdateClickedAbout(true)}
            >
                <h3 className='Text' style={{marginTop: "45%"}}>Update Bio</h3>
                
            {!updateClickedAbout
            ?
            <h4 style={{color: "white"}}>
                {aboutArtist}
            </h4>
            :
            <></> 
            }
            </div>
        :
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
        }
        
       
        
              
      
        
        <br></br>
        {updateClickedAbout
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
