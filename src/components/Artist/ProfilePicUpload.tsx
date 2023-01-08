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
        updateClicked
    } = useContext(ArtistContext)

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
        }
    }


  return (
    <div 
    style={{
    width: "400px", 
    height: "500px", 
    display: "flex",
    flexDirection: "column",   
    }}>
        <div
        style={{
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: "1px",
        height: "400px",
        width: "400px"
        }}
        
        >
            {picURL
            ?
            <img src={picURL} width="99%" height="99%"/>
            :
            <h3 
            className='Text'
            style={{textAlign: "center", marginTop: "45%"}}
            >Upload Profile Pic</h3>
            }
        </div>
        <br></br>
        {updateClicked
        ?
        <input
        type= 'file'
        className='UploadProfilePic'
        onChange={handleUpload}
        />
        :
        <></>
        }
    </div>
  )
}

export default ProfilePicUpload
