import React, {FC, useEffect, useState} from 'react'
import {Contract} from 'ethers'

type props = {
    artistProfileContract : Contract | undefined
}

const AboutMe : FC<props> = ({artistProfileContract}) => {

    const [aboutArtist, setAboutArtist] = useState("")
    const [update, setUpdate] = useState("")
    const [clicked, setClicked] = useState(false)

    const getAboutMe = async () => {
        const about = await artistProfileContract?.aboutMe()
        console.log(about)
        setAboutArtist(about)
    }

    const updateAboutMe = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdate(e.target.value)
    }

    const handleSubmit = async () => {
        try{
            const updated = await artistProfileContract?.updateAboutMe(update)
            await updated.wait()
        }catch(error){

        }finally{
            getAboutMe()
            setClicked(!clicked)
        }
    }

    const openinput = () => {
        setClicked(!clicked)
    }

    useEffect(() => {
        getAboutMe()
    },[artistProfileContract])

  return (
    <div>
        <div className='AboutMe'>
            <div className='AboutMeBox' >
                <h4>
                    {aboutArtist}
                </h4>
                <br></br>
                <br></br>
                
                <br></br>
                <br></br>
                { clicked 
                
                ?

                <div className='AboutMeUpdate'>
                    <textarea
                    className='AboutMeUpdateBox'
                    placeholder='About...'
                    onChange= {updateAboutMe}
                    >
                    </textarea> 
                    <button 
                    onClick= {handleSubmit}
                    >
                    submit
                    </button>
                </div>
                
                :

                <div></div>}
            
            </div>
           
        </div>
        <h4  
        className='UpdateAboutMe'
        onClick= {openinput}
        >
        Update Profile
        </h4>
    </div>
  )
}

export default AboutMe
