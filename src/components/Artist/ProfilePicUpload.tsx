import React, {useState, useContext, useEffect} from 'react'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import ArtistContext from '../../Context/ArtistContext'


const ID = '2JyLq457L1ui2mdONs7nmP6mq4G'
const SECRET = '5f8720e252ac8cf4d7aed85091b1d1a1'

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

    const {
        picURL, 
        setPicURL, 
        artistProfileAddress, 
        createArtistProfileInstance,
        updateClickedPic,
        setUpdateClickedPic,
        updateClickedWhole
    } = useContext(ArtistContext)

    console.log(updateClickedPic)
    console.log(picURL)

    const handleUpload = async (e : any) => {
        const profilePic : any = e.target.files[0]
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        try{
            const added = await client.add(profilePic)
            const url = `https://music-pay-profile-pic.infura-ipfs.io/ipfs/${added.path}`
            setPicURL(url)
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
        height: "500%"
    }}
    >
        {updateClickedPic
        ?
            <div 
            className='ProfilePic'
            style={{
                width: "500px", 
                height: "500%", 
                border: "solid 2px #7f7f7f",
                opacity: "0.9" 
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
                    <img src={picURL} width="99%" height="99%"/>
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