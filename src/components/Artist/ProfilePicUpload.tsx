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
        setUpdateClickedPic
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
        width: "400px", 
        height: "500px",
        display: "flex",
        flexDirection: "column",
    }}
    >
        {updateClickedPic
        ?
            <div 
            className='ProfilePic'
            style={{
                width: "400px", 
                height: "400px", 
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
                height: "400px",
                width: "400px"
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
                width: "400px", 
                height: "400px",   
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
                height: "400px",
                width: "400px"
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
            }


        <br></br>
        <button 
        className='UpdateButton'
        style={{width: "30%", marginLeft: "auto", marginRight: "auto"}}
        onClick={() => {setUpdateClickedPic(true)}}
        >
            Update Picture
        </button>
    </div>
  )
}

export default ProfilePicUpload
