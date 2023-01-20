import React, {useContext, useEffect} from 'react'
import ArtistContext from '../../Context/ArtistContext'

const ArtistInfo = () => {

    const {artistBalance, getBalance} = useContext(ArtistContext)

    useEffect(()=> {
        getBalance()
    },[])

  return (
    <div
    className='ArtistInfo'
    >
        <h4 
        className='Text'
        style= {{margin: 0, display: "inline"}}
        >
            Balance: ${artistBalance.toString()}
        </h4>
      
    </div>
  )
}

export default ArtistInfo
