import React, {FC, useEffect, useState} from 'react'
import { BigNumber, BytesLike, ethers, utils } from 'ethers'
import Booking from './Booking'

type props = {
    bookings : any[]
}

const BookingsList :FC<props> = ({bookings}) => {
    console.log(bookings)
    
    // bookings.map((booking : any[]) => console.log(booking[0]))

    // const displayBooking = bookings.map((booking : any[]) =>  

    //     <Booking
    //     payment={(BigNumber.from(booking[0])).toString()}
    //     time= {(BigNumber.from(booking[1])).toString()}
    //     date = {booking[2]}
    //     venue = {booking[3]}
    //     />
    // )
    
    

    return(
        <div>
            {/* {displayBooking} */}
           
        
        </div>
    )
  
}

export default BookingsList

// <Booking
// payment= {booking[0].toNumber()}
// time= {booking[1].toString()}
// date= {booking[2]}
// venue= {booking[3]}
// />
