import React, {FC} from 'react'
import { ethers, utils } from 'ethers'
import Booking from './Booking'

type props = {
    bookings : any[]
}

const BookingsList :FC<props> = ({bookings}) => {
  return (
    <div>
        {bookings.map(booking => (
            <Booking
            payment= {booking[4].toString()}
            time= {booking[5].toString()}
            date= {utils.parseBytes32String(booking[8])}
            venue= {utils.parseBytes32String(booking[7])}
            />
        ))}
      
    </div>
  )
}

export default BookingsList
