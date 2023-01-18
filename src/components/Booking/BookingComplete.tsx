import React, {useContext} from 'react'
import BookingContext from '../../Context/BookingContext'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

const BookingComplete = () => {

    const navigate = useNavigate()

    const {artistBooking, setArtistBooking, artistName, setArtistName} = useContext(BookingContext)

    const resetBooking = () => {
        setArtistBooking({
            bookingAgent: "",
            payment: "",
            time: "",
            date: "",
            venue: "" 
        })
        setArtistName("")
        navigate("/BookingMain")
    }

  return (
    <motion.div
    className='Complete'
    style={{height: "100%"}}
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    >
        <h1 
        className='Text'
        style={{fontSize: '35px'}}
        >
            Thanks {artistBooking.bookingAgent} 
        </h1>
        <h1 
        className='Text'
        style={{fontSize: '22px'}}
        >
            You have sent a Booking request to {artistName} to perform at {artistBooking.venue} 
        </h1>
        <h1 
        className='Text'
        style={{fontSize: '22px'}}
        >
            on {artistBooking.date} for ${artistBooking.payment}
        </h1>
        <br></br>
        <br></br>
        <button
        className='Submit'
        style={{
            color: "white", 
            opacity: "0.8",
            backgroundColor: "black", 
            width: "20%",
            borderStyle: "solid",
            borderColor: "grey",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "12px",
            padding: "12px",
            textDecoration: "none"
        }}
        onClick={() => resetBooking() }
        >
            BACK
        </button>

    </motion.div>
  )
}

export default BookingComplete
