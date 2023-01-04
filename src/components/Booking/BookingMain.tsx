import React, {FC, ReactElement} from 'react'
import BookingHeader from "./BookingHeader"
import BookingHeaderMobile from './Mobile/BookingHeaderMobile'
import {motion} from 'framer-motion'

const BookingMain : FC = () : ReactElement => {

  return (
    <div
    style={{height: "100%"}}
    >
      <BookingHeader/>
      <BookingHeaderMobile/>
      <motion.div
      className='BookingMain' 
      initial= {{opacity: 0}}
      animate= {{opacity: 1}}
      exit= {{opacity: 0}}
      >
            <h3 
            className='Text'
            >Welcome to Music-Pay for Bookings</h3>
        </motion.div>
    </div>
  )
}

export default BookingMain
