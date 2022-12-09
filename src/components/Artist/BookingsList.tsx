import React, {FC, ReactElement, useContext} from 'react'
import {ethers, BigNumber} from 'ethers'
import Booking from './Booking'
import ArtistContext from '../../context/ArtistContext'

const BookingsList :FC = () : ReactElement => {

    const {updateDisplayBookings, bookings} = useContext(ArtistContext)

   
    const displayBooking = bookings.map((booking : any[]) =>  
        <Booking
        gigNumber= {(BigNumber.from(booking[0])).toString()}
        payment={(BigNumber.from(booking[1])).toString()}
        time= {(BigNumber.from(booking[2])).toString()}
        date = {booking[3]}
        venue = {booking[4]}
        />
    )

    console.log(bookings)
    
    return(
        <div>
            {updateDisplayBookings
            ?
            <div className='BookingsList'>
                <h1
                className='Text'
                >Bookings
                </h1>
                {displayBooking}
            </div>
            :
            <></>
            }
        </div>
    )
}

export default BookingsList
