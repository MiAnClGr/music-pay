import React, {FC, ReactElement, useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {ArtistFactoryContract, PerformanceContract} from "../../Contracts/ContractObjects"
import BookingHeader from "../shared/BookingHeader"

type props = {
  artistAddress: string 
  setArtistAddress : React.Dispatch<React.SetStateAction<string>>
}

const ArtistBooking : FC<props> = ({artistAddress, setArtistAddress}) : ReactElement => {

  const [artistName, setArtistName] = useState(localStorage.getItem("artistName") || "")
  const [artistBooking, setArtistBooking] = useState({
    bookingAgent: "",
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
      artistName,
      artistBooking.bookingAgent,
      artistBooking.payment,
      artistBooking.time,
      artistBooking.venue,
      artistBooking.date
     
    )
  }

  const handleSubmit = () => {
    submitBooking()
  }

  console.log(artistAddress)

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
      <BookingHeader
      setArtistAddress={setArtistAddress}
      />
      
      <div className='ArtistBooking'>
        <h3 className='ArtistNameBooking'>{artistName}</h3>
          <div className='BookingForm'>
          <input 
            autoComplete='off'
            placeholder="Booking Agent" 
            name= "bookingAgent"
            onChange={handleChange}
            >
            </input>
            <input 
            autoComplete='off'
            placeholder="Payment" 
            name= "payment"
            onChange={handleChange}
            >
            </input>
            <input 
            autoComplete='off'
            placeholder="Time" 
            name="time"
            onChange={handleChange}
            >
            </input>
            <input 
            autoComplete='off'
            placeholder="Venue" 
            name="venue"
            onChange={handleChange}
            >
            </input>
            <input 
            autoComplete='off'
            placeholder="Date" 
            name="date"
            onChange={handleChange}
            >
            </input>
            <h4 className='SubmitBooking'
            onClick= {handleSubmit}
            >
              Book Artist
            </h4>
        </div>
      </div>
    </div>
  )
}

export default ArtistBooking