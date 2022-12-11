import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import BookingContext from '../../Context/BookingContext'
import {motion} from 'framer-motion'

const BookingComplete = () => {

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
    }

  return (
    <motion.div
    className='BookingComplete'
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    >
        <h1 
        className='Text'
        style={{fontSize: '40px'}}
        >
            Thanks {artistBooking.bookingAgent} 
        </h1>
        <h1 
        className='Text'
        style={{fontSize: '22px'}}
        >
            You have booked {artistName} to perform at {artistBooking.venue} 
        </h1>
        <h1 
        className='Text'
        style={{fontSize: '22px'}}
        >
            on {artistBooking.date} for ${artistBooking.payment}
        </h1>
        <br></br>
        <br></br>
        <Link
        className='Link'
        to={"/BookingMain"}
        onClick={() => resetBooking() }
        >
            Back
        </Link>

    </motion.div>
  )
}

export default BookingComplete
