import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import {ArtistFactoryContract, PerformanceContract} from "../../contracts/ContractObjects"
import BookingHeader from "../shared/BookingHeader"
import BookingContext from '../../context/BookingContext'

const ArtistBooking : FC = () : ReactElement => {

  const [artistName, setArtistName] = useState(localStorage.getItem("artistName") || "")
  const [artistBooking, setArtistBooking] = useState({
    bookingAgent: "",
    payment: "",
    time: "",
    date: "",
    venue: ""
  })

  const {searchedAddress} = useContext(BookingContext)

  const getArtistName = async () => {
    const name = await ArtistFactoryContract.artistByAddress(searchedAddress)
    console.log(name)
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
    const booking = await PerformanceContract.createBooking(
      searchedAddress,
      artistName,
      artistBooking.bookingAgent,
      artistBooking.payment,
      artistBooking.time,
      artistBooking.venue,
      artistBooking.date
    )

    await booking.wait()
    
  }

  const handleSubmit = () => {
    submitBooking()
    setArtistBooking({
      bookingAgent: "",
      payment: "",
      time: "",
      date: "",
      venue: "" })
  }

  console.log(searchedAddress)

  useEffect(() => {
    localStorage.setItem("artistName", artistName)
  },[artistName])

  useEffect(() => {
    localStorage.setItem("searchedAddress", searchedAddress)
  },[searchedAddress])

  useEffect(() => {
    getArtistName()
  }, [searchedAddress])

  return (
    <div className='Parent-div'>
      <BookingHeader/>
      
      <div className='ArtistBooking'>
        <h3 className='ArtistNameBooking'>{artistName}</h3>
          <form className='BookingForm'>
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
            <button 
            className='SubmitBooking'
            type= 'submit'
            onClick= {handleSubmit}
            >
              Book Artist
            </button>
        </form>
      </div>
    </div>
  )
}

export default ArtistBooking