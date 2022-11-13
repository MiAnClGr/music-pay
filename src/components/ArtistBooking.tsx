import React, {FC, useEffect, useState} from 'react'
import {ArtistFactoryContract} from "../ContractObjects"

type props = {
  artistAddress: string
}

const ArtistBooking : FC<props> = ({artistAddress}) => {

  const [artistName, setArtistName] = useState("")

  const getArtistName = async () => {
    const name = await ArtistFactoryContract.artistByAddress(artistAddress)
    setArtistName(name)
  }

  useEffect(() => {
    getArtistName()
  }, [])


  return (
    <div className='ArtistBooking'>
      <h1 className='HeaderText'>{artistName}</h1>
      <h1 className='HeaderText'>{artistAddress}</h1>
    </div>
  )
}

export default ArtistBooking