import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import ArtistContext from '../../Context/ArtistContext'

const AboutMe : FC = () : ReactElement => {

    const {
        createArtistProfileInstance,
        artistProfileAddress,
        updateClickedAbout,
        setUpdateClickedAbout
    } = useContext(ArtistContext)

    console.log(updateClickedAbout)
    
    
    const [update, setUpdate] = useState<string>("")
    const [aboutArtist, setAboutArtist] = useState<string>("")
    const [bioUpdated, setBioUpdated] = useState<boolean>(false)

    console.log(aboutArtist)

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
            setBioUpdated(true)
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
    
        {updateClickedAbout
        ?

            <div 
            className='AboutMeUpdate'>
                <textarea
                className='AboutMeUpdateBox'
                style={{opacity: "0.7"}}
                placeholder='About...'
                onChange= {updateAboutMe}
                >
                    {aboutArtist}
                </textarea> 
                <button
                className='UpdateButton'
                style={{width: "30%", marginLeft: "auto", marginRight: "auto", marginTop: "3.5%"}}
                onClick={handleSubmitAboutMe}
                >Save</button>
            </div> 
        :    
        <div 
            className='AboutMeBox'
        >
            {aboutArtist === ""
            ?
                <button 
                className='UpdateButton'
                style={{
                    marginTop: "45%", 
                    width: "30%", 
                    marginLeft: "auto", 
                    marginRight: "auto", 
                    borderColor: "#323232"}}
                onClick= {() => setUpdateClickedAbout(true)}
                >Update Bio
                </button>
            :
            <div 
            className='AboutMeBox'
            style={{padding: "20px", width: "360px", height: "360px", textAlign: "left"}}
            >   
                {aboutArtist !== ""
                ?
                <h4 style={{color: "white"}}>
                    {aboutArtist}
                </h4>
                :
                <h4></h4>
                }
                
               
            </div>
            }
        </div>
        }
        <br></br>
            {(aboutArtist !== "") && (!updateClickedAbout)
            ?
                <button 
                className='UpdateButton'
                style={{
                    width: "30%", 
                    marginLeft: "auto", 
                    marginRight: "auto",
                    
                }}
                onClick= {() => setUpdateClickedAbout(true)}
                >Update Bio
                </button>
            :
            <></>

            }
            

    </div>
  )

}
export default AboutMe
