import React, {FC, useEffect, useState} from 'react'
import { BigNumber, BytesLike, ethers, utils } from 'ethers'
import Booking from './Booking'

type props = {
    bookings : any[]
}

const BookingsList :FC<props> = ({bookings}) => {
    console.log(bookings)

    function hexify(s : string) {
        let r = [];
        for (let i = 2; i < s.length - 1; i += 2) {
            r.push(String.fromCharCode(parseInt(s.charAt(i) + s.charAt(i + 1), 16)));
        }
        let stringJoined =  r.join("");
        return stringJoined.replace(/[^\x20-\x7E]/g, '')
    }



   
    const displayBooking = bookings.map((booking : any[]) =>  

        <Booking
        gigNumber= {(BigNumber.from(booking[0])).toString()}
        payment={(BigNumber.from(booking[1])).toString()}
        time= {(BigNumber.from(booking[2])).toString()}
        date = {hexify(booking[2])}
        venue = {hexify(booking[3])}
        />
    )
    
    

    return(
        <div className='BookingsList'>
            <h1
            className='Text'
            >Bookings
            </h1>
            {displayBooking}
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
