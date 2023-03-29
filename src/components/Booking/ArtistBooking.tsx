import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import BookingHeader from "./BookingHeader"
import BookingContext from '../../Context/BookingContext'
import { useNavigate } from 'react-router'
import {motion} from 'framer-motion'
import ArtistContext from '../../Context/ArtistContext'

const ArtistBooking : FC = () : ReactElement => {

  const navigate = useNavigate()

  /// access context variables and functions
  const {
    searchedAddress, 
    artistBooking, 
    setArtistBooking, 
    artistName,
    getArtistName
  } = useContext(BookingContext)

  const {createArtistProfileInstance} = useContext(ArtistContext)

/// User Actions

  /// Submit booking
  const handleSubmit = async () => {
    navigate("/Loading")
    const artistProfileContract = createArtistProfileInstance(searchedAddress)
    try{
      const booking = await artistProfileContract.createBooking(
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

/// Event Handlers

  /// Handle change in booking input fields
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setArtistBooking(prevFormData => {
      return {
      ...prevFormData,
      [e.target.name] : e.target.value  
      }  
    })
  }

  /// Get artist name when searchedAddress changes
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
          style={{
            fontSize: "45px", 
            marginTop: "0", 
            marginBottom: "10px", 
            width: "500px"
          }}
          >You are now booking</h3>
          <h3 
          className='ArtistNameBooking'
          style={{fontSize: "50px"}}
          >{artistName}</h3>
          <br></br>
          <br></br>
          <input 
            className='Input'
            style={{
              height: "5%",
              width: "60%",
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey",
              backgroundColor: "#171717"
            }}
            autoComplete='off'
            placeholder="Booking Agent Name" 
            name= "bookingAgent"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              height: "5%",
              width: "60%",
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey",
              backgroundColor: "#171717"
            }}
            autoComplete='off'
            placeholder="Payment" 
            name= "payment"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              height: "5%",
              width: "60%",
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey",
              backgroundColor: "#171717"
            }}
            autoComplete='off'
            placeholder="Time" 
            name="time"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              height: "5%",
              width: "60%",
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey",
              backgroundColor: "#171717"
            }}
            autoComplete='off'
            placeholder="Venue" 
            name="venue"
            onChange={handleChange}
            />
            <input 
            className='Input'
            style={{
              height: "5%",
              width: "60%",
              borderBottom: "solid",
              borderWidth: "1px",
              borderColor: "grey",
              backgroundColor: "#171717"
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
              CONFIRM
            </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ArtistBooking