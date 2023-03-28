import React, {useState, useContext, useEffect} from 'react'
import { ArtistFactoryContract } from '../../Contracts/ContractObjects'
import ArtistContext from '../../Context/ArtistContext'

const ArtistInfo = () => {

    /// access context states and functions
    const {
        artistBalance, 
        getBalance, 
        createArtistProfileInstance, 
        artistProfileAddress,
        handleMouseOver,
        handleMouseOut
    } = useContext(ArtistContext)

    /// state variables
    const [rating, setRating] = useState<number>(0)

/// User actions

    ///withdraws balance from contract
    const withdrawBalance = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        await artistProfileContract.withdraw()
    }
 
/// Helper function

    /// fetches rating from contract
    const getRating = async () => {
        const ratingUp = await ArtistFactoryContract.ratingArtistUp(artistProfileAddress)
        const ratingDown = await ArtistFactoryContract.ratingArtistDown(artistProfileAddress)
        const rating = ratingUp.toNumber() - ratingDown.toNumber()
        setRating(rating)
    }

    /// calls getBalance and getRating on load

    useEffect(()=> {
        getBalance()
        getRating()
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
        style={{margin: 0}}
        >Rating: {rating.toString()}</h4>
        <h4 
        className='Text'
        style= {{marginBottom: 0, marginTop: "1%", display: "inline"}}
        >
            Balance: ${(artistBalance/10**18).toString()}
        </h4>
        <button
        className='Submit'
        style={{width: "80%", height: "25%", padding: "1%", marginBottom: "1%"}}
        onClick={withdrawBalance}
        >
            withdraw
        </button>
      
    </div>
  )
}

export default ArtistInfo
