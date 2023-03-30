import React, {useContext} from 'react'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import ArtistContext from '../../Context/ArtistContext'

/*
 * This component handles the upload of the profile picture to IPFS.
 */

/// Environment Variables

const ID = process.env.REACT_APP_INFURA_PROJECT_ID
const SECRET = process.env.REACT_APP_INFURA_PROJECT_SECRET

/// IPFS Client

const auth = 'Basic ' + Buffer.from(ID + ':' + SECRET).toString('base64');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth,
    }
})

const ProfilePicUpload = () => {

    ///access context state variables and functions
    const {
        picURL, 
        setPicURL, 
        artistProfileAddress, 
        createArtistProfileInstance,
        updateClickedPic,
        setUpdateClickedPic,
        updateClickedWhole
    } = useContext(ArtistContext)

    /// handles the upload of the profile picture
    const handleUpload = async (e : any) => {
        const profilePic : any = e.target.files[0]
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        try{
            /// adding the profile picture to IPFS
            const added = await client.add(profilePic)
            /// creating a URL for the profile picture using the CID
            const url = `https://personal-project-storage.infura-ipfs.io/ipfs/${added.path}`
            setPicURL(url)
            /// updating the profile picture URL in the Artist Profile contract
            await artistProfileContract.updateProfilePicURL(url)
        }catch(error){
            console.log(error)
        }finally{
            setUpdateClickedPic(false)
        }
    }


  return (
    <div
    style={{
        width: "500px", 
        height: "500px"
    }}
    >
        {updateClickedPic
        ?
            <div 
            className='ProfilePic'
            style={{
                width: "500px", 
                height: "500px", 
                border: "solid 2px #7f7f7f"
            }}
            >
                
                {updateClickedPic
                ?
                <input
                style={{
                    height: "10%",
                    width: "30%",
                    marginTop: "45%",
                    marginLeft: "35%",
                    marginRight: "auto"
                    }}
                type= 'file'
                className='UploadProfilePic'
                onChange={handleUpload}
                />
                :
                <div
                className='ProfilePic'
                style={{
                height: "500px",
                width: "500px"
                }}
                
                >
                    {picURL
                    ?
                    <img src={picURL} width="100%" height="100%"/>
                    :
                    <></>
                    
                    }
                </div>
                }
            </div>
        :
            <div 
            className='ProfilePic'
            style={{
                width: "500px", 
                height: "500px",  
            }}
            >
                
                {updateClickedPic
                ?
                <input
                style={{
                    height: "10%",
                    width: "30%",
                    marginTop: "45%",
                    marginLeft: "35%",
                    marginRight: "auto"
                    }}
                type= 'file'
                className='UploadProfilePic'
                onChange={handleUpload}
                />
                :
                <div
                className='ProfilePic'
                style={{
                height: "500px",
                width: "500px"
                }}
                onClick= {() => setUpdateClickedPic(true)}
                
                >
                    {picURL
                    ?
                    <img src={picURL} width="100%" height="100%"/>
                    :
                    <h3 
                    className='Link' 
                    style={{
                        fontSize: "16px",
                        fontWeight: "lighter",
                        marginTop: "45%", 
                        marginLeft: 'auto', 
                        marginRight: 'auto',
                        width: '40%',
                        cursor: "pointer",
                        border: "none"
                    }}
                    onClick= {() => setUpdateClickedPic(true)}
                    >Upload Profile Picture</h3>
                    
                    }
                  
                </div>
                }
                {updateClickedWhole
                ?
                <button 
                className='UpdateButton'
                style={{width: "20%", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}
                onClick={() => {setUpdateClickedPic(true)}}
                >
                    Update
                </button>
                :
                <></>
                }
                
            </div>
            }


        
       
    </div>
  )
}

export default ProfilePicUpload