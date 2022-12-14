import React, {FC, ReactElement} from 'react'
import BookingHeader from "../shared/BookingHeader"
import {motion} from 'framer-motion'

const BookingMain : FC = () : ReactElement => {

  return (
    <div
    style={{height: "100%"}}
    >
      <BookingHeader/>
      <motion.div 
      style= {{textAlign: 'center', marginTop: '280px'}}
      initial= {{opacity: 0}}
      animate= {{opacity: 1}}
      exit= {{opacity: 0}}
      >
            <h3 
            className='Text'
            style= {{fontSize: '80px', letterSpacing: "3px"}}
            >Welcome to Music-Pay for Bookings</h3>
        </motion.div>
    </div>
  )
}

export default BookingMain
