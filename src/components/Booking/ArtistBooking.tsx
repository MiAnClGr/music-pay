import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import {ArtistFactoryContract, PerformanceContract} from "../../contracts/ContractObjects"
import BookingHeader from "../shared/BookingHeader"
import BookingContext from '../../context/BookingContext'
import { useNavigate } from 'react-router'

const ArtistBooking : FC = () : ReactElement => {

  
  
  const {
    searchedAddress, 
    artistBooking, 
    setArtistBooking, 
    artistName,
    getArtistName
  } = useContext(BookingContext)

  const navigate = useNavigate()

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setArtistBooking(prevFormData => {
      return {
      ...prevFormData,
      [e.target.name] : e.target.value  
      }  
    })
  }

  const handleSubmit = async () => {
    navigate("/Loading")
    try{
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
    }catch(e){

    }finally {
      navigate("/BookingComplete")
    }
    
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