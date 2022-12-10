import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import BookingContext from '../../context/BookingContext'

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
    <div
    className='BookingComplete'
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

    </div>
  )
}

export default BookingComplete
