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

    const handleSubmitAboutMe = async (e : React.KeyboardEvent<HTMLElement>) => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        if(e.key === 'Enter'){
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
    }
 
    useEffect(() => {
        getAboutMe()
    },[])

  return (
  
    <div className='AboutMe'>
        <div className='AboutMeBox' >
            <h4>
                {aboutArtist}
            </h4>
            <br></br>
            <br></br>
            
            <br></br>
            <br></br>
            {updateClicked
            ?
            <div className='AboutMeUpdate'>
                <textarea
                className='AboutMeUpdateBox'
                placeholder='About...'
                onChange= {updateAboutMe}
                onKeyDown= {handleSubmitAboutMe}
                >
                </textarea> 
            </div>          
            :
            <></>}       
        </div>
    </div>

  )
}

export default AboutMe
