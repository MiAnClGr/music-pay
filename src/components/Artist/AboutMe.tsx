import React, {FC, ReactElement, useEffect, useState} from 'react'
import {ethers, Contract} from 'ethers'

type props = {
    createArtistProfileInstance : (artist: string) => ethers.Contract
    artistProfileAddress : string
    updateClicked: boolean
    setUpdateClicked : React.Dispatch<React.SetStateAction<boolean>>
}

const AboutMe : FC<props> = ({createArtistProfileInstance, artistProfileAddress, updateClicked, setUpdateClicked}) : ReactElement => {

    const [aboutArtist, setAboutArtist] = useState("")
    const [update, setUpdate] = useState("")

    const getAboutMe = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const about = await artistProfileContract.aboutMe()
        console.log(about)
        setAboutArtist(about)
    }

    const updateAboutMe = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdate(e.target.value)
    }

    const handleSubmit = async (e : React.KeyboardEvent<HTMLElement>) => {
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
                onKeyDown= {handleSubmit}
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
