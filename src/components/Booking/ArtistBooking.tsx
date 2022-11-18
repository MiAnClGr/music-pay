import React, {FC, useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {ArtistFactoryContract, PerformanceContract, signer} from "../../Contracts/ContractObjects"
import BackToTitlePage from '../shared/BackToTitlePage'


type props = {
  artistAddress: string 
}

const ArtistBooking : FC<props> = ({artistAddress}) => {

  const [artistName, setArtistName] = useState(localStorage.getItem("artistName") || "")
  const [artistBooking, setArtistBooking] = useState({
    payment: "",
    time: "",
    date: "",
    venue: ""
  })

  const getArtistName = async () => {
    const name = await ArtistFactoryContract.artistByAddress(artistAddress)
    setArtistName(name)
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setArtistBooking(prevFormData => {
      return {
      ...prevFormData,
      [e.target.name] : e.target.value  
      }  
    })
  }

  const submitBooking = async () => {
    await PerformanceContract.createBooking(
      artistAddress,
      ethers.utils.formatBytes32String(artistName),
      artistBooking.payment,
      artistBooking.time,
      ethers.utils.formatBytes32String(artistBooking.date),
      ethers.utils.formatBytes32String(artistBooking.venue)
    )
  }

  const handleSubmit = () => {
    submitBooking()
  }

  useEffect(() => {
    localStorage.setItem("artistName", artistName)
  },[artistName])

  useEffect(() => {
    localStorage.setItem("artistAddress", artistAddress)
  },[artistAddress])

  useEffect(() => {
    getArtistName()
  }, [artistName, artistAddress])


  return (
    <div className='Parent-div'>
      <div className='ArtistBooking'>
        <div className='ArtistBookingHeader'>
          <h5 className='HeaderText'>{artistAddress}</h5>
          <h1 className='HeaderText'>{artistName}</h1>
        </div>
        <form className='BookingForm'>
          <input 
          placeholder="Payment" 
          name= "payment"
          onChange={handleChange}
          >

          </input>
          <input 
          placeholder="Time" 
          name="time"
          onChange={handleChange}
          >

          </input>
          <input 
          placeholder="Date" 
          name="date"
          onChange={handleChange}
          >

          </input>
          <input 
          placeholder="Venue" 
          name="venue"
          onChange={handleChange}
          >

          </input>
        </form>
        <div className="SubmitBooking">
          <button 
          onClick= {handleSubmit}
          >
            Book Artist
          </button>
        </div>
      </div>
      <BackToTitlePage/>
    </div>
  )
}

export default ArtistBooking