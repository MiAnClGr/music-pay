import React, {useContext, useEffect} from 'react'
import { ethers } from 'hardhat'
import ArtistContext from '../../Context/ArtistContext'

const ArtistInfo = () => {

    const {
        artistBalance, 
        getBalance, 
        createArtistProfileInstance, 
        artistProfileAddress,
        handleMouseOver,
        handleMouseOut
    } = useContext(ArtistContext)

    const withdrawBalance = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        await artistProfileContract.withdraw()
    }

    useEffect(()=> {
        getBalance()
    },[])

  return (
    <div
    className='ArtistInfo'
    style={{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        gap: "15%"
    }}
    onMouseOver={handleMouseOver}
    onMouseOut = {handleMouseOut}
    >
        <h4 
        className='Text'
        style= {{marginBottom: 0, marginTop: "1%", display: "inline"}}
        >
            Balance: ${(artistBalance/10**18).toString()}
        </h4>
        <button
        className='Submit'
        style={{width: "80%", height: "40%", padding: "1%", marginBottom: "1%"}}
        onClick={withdrawBalance}
        >
            withdraw
        </button>
      
    </div>
  )
}

export default ArtistInfo
