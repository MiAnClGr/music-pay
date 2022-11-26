import React, {FC, useEffect, useState} from 'react'
import {Contract} from 'ethers'

type props = {
    artistProfileContract : Contract | undefined
    clicked: boolean
    setClicked : React.Dispatch<React.SetStateAction<boolean>>
}

const AboutMe : FC<props> = ({artistProfileContract, clicked, setClicked}) => {

    const [aboutArtist, setAboutArtist] = useState("")
    const [update, setUpdate] = useState("")

    const getAboutMe = async () => {
        const about = await artistProfileContract?.aboutMe()
        console.log(about)
        setAboutArtist(about)
    }

    const updateAboutMe = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdate(e.target.value)
    }

    const handleSubmit = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){
            try{
                const updated = await artistProfileContract?.updateAboutMe(update)
                await updated.wait()
            }catch(error){

            }finally{
                getAboutMe()
                setClicked(!clicked)
            }
        }
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
                    onKeyDown= {handleSubmit}
                    >
                    </textarea> 
                </div>
                
                :

                <div></div>}
            
            </div>
        </div>
    </div>
  )
}

export default AboutMe
