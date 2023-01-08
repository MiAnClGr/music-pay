import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import {PerformanceContract} from "../../Contracts/ContractObjects"
import BookingHeader from "./BookingHeader"
import BookingContext from '../../Context/BookingContext'
import { useNavigate } from 'react-router'
import {motion} from 'framer-motion'

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
      console.log(e)
    }finally{
      navigate("/BookingComplete")
    } 
  }

  console.log(artistBooking)
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
    <div
    style={{height: "100%"}}
    >
      <BookingHeader/>
      
      <motion.div 
      className='ArtistBooking'
      initial= {{opacity: 0}}
      animate= {{opacity: 1}}
      exit= {{opacity: 0}}
      >
        
        <motion.div 
        className='BookingForm'
        initial= {{opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}}
        >
          <h3 
          className='Text'
          style={{fontSize: "50px", marginBottom: "10px", width: "500px"}}
          >You are now booking</h3>
          <h3 
          className='ArtistNameBooking'
          style={{fontSize: "60px"}}
          >{artistName}</h3>
          <br></br>
          <br></br>
          <input 
            className='Input'
            style={{
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey"
            }}
            autoComplete='off'
            placeholder="Booking Agent Name" 
            name= "bookingAgent"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey"
            }}
            autoComplete='off'
            placeholder="Payment" 
            name= "payment"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey"
            }}
            autoComplete='off'
            placeholder="Time" 
            name="time"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey"
            }}
            autoComplete='off'
            placeholder="Venue" 
            name="venue"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey"
            }}
            autoComplete='off'
            placeholder="Date" 
            name="date"
            onChange={handleChange}
            />
           
            <br></br>
            <br></br>
            <button 
            className='SubmitBooking'
            type= 'submit'
            onClick= {handleSubmit}
            >
              BOOK ARTIST
            </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ArtistBooking