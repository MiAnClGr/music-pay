import React, {FC, ReactElement} from 'react'
import BookingHeader from "../shared/BookingHeader"

const BookingMain : FC = () : ReactElement => {

  return (
    <>
      <BookingHeader/>
      <div style= {{textAlign: 'center', marginTop: '250px'}}>
            <h3 
            className='Text'
            style= {{fontSize: '60px'}}
            >Welcome to Music-Pay for Bookings</h3>
        </div>
    </>
  )
}

export default BookingMain
