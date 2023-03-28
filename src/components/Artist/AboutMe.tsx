import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import ArtistContext from '../../Context/ArtistContext'

const AboutMe : FC = () : ReactElement => {

    // access various states and functions from ArtistContext
    const {
        createArtistProfileInstance,
        artistProfileAddress,
        updateClickedAbout,
        setUpdateClickedAbout,
        updateClickedWhole
    } = useContext(ArtistContext)

    // state variables
    const [update, setUpdate] = useState<string>("")
    const [aboutArtist, setAboutArtist] = useState<string>("")
    const [name, setName] = useState("")

///User actions

    // submits about me update to contract
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


/// Event handlers

    //updates about me state
    const updateAboutMe = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdate(e.target.value)
    }


/// Helper functions

    //fetches artist name from contract
    const getArtistName = async () => {
        const artistProfile = createArtistProfileInstance(artistProfileAddress)
        const name = await artistProfile.artistName()
        console.log(name)
        setName(name)
    }

    // fetches about me from contract  
    const getAboutMe = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const about = await artistProfileContract.aboutMe()
        console.log(about)
        setAboutArtist(about)
    }



    // fetches artist name and about me on load
 
    useEffect(() => {
        getAboutMe()
        getArtistName()
    },[artistProfileAddress])

  return (
    <div
    style={{
        width: "500px", 
        height: "500%", 
        display: "flex",
        flexDirection: "column", 
        textAlign: "center"
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
            }}>{name}
        </h2>

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
                style={{width: "20%", marginRight: "auto", marginTop: "10px"}}
                onClick={handleSubmitAboutMe}
                >Save</button>
            </div> 
        :    
        <div 
            className='AboutMeBox'
        >
           
            <div 
            className='AboutMeBoxInside'
            onClick= {() => setUpdateClickedAbout(true)}
            >   
            
                {aboutArtist !== ""
                ?
                <h4 style={{color: "white"}}>
                    {aboutArtist}
                </h4>
                :
                <h3 
                className='Link'
                style={{
                    fontSize: "16px",
                    fontWeight: "lighter",
                    marginTop: "40%", 
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                    width: '40%',
                    cursor: "pointer",
                    border: "none",
                }}
                onClick= {() => setUpdateClickedAbout(true)}
                >Update Bio
                </h3>
                }
                
               
            </div>
            
        </div>
        }
            
            {(updateClickedWhole) && (!updateClickedAbout)
            ?
                <button 
                className='UpdateButton'
                style={{
                    width: "20%", 
                    marginRight: "auto",
                    marginTop: "10px"
                }}
                onClick= {() => setUpdateClickedAbout(true)}
                >Update
                </button>
            :
            <></>

            }
            

    </div>
  )

}
export default AboutMe