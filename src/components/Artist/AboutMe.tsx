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

    const openTextArea = () => {
        setClicked(!clicked)
    }

    useEffect(() => {
        getAboutMe()
    },[artistProfileContract])

  return (
    <div className='AboutMe'>
        <h3>
            About: {aboutArtist}
        </h3>
        <br></br>
        <br></br>
        <button 
        className= 'Submit' 
        onClick= {openTextArea}
        >
        update
        </button>
        <br></br>
        <br></br>
        { clicked 
        
        ?

        <div>
            <textarea
            className='Inputs'
            placeholder='About...'
            onChange= {updateAboutMe}
            >
            </textarea> 
            <button 
            className= 'Submit' 
            onClick= {handleSubmit}
            >
            submit
            </button>
        </div>
        
        :

        <div></div>}
     
    </div>
  )
}

export default AboutMe
