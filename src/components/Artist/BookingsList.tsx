import React, {FC, ReactElement} from 'react'
import {ethers, BigNumber} from 'ethers'
import Booking from './Booking'

type props = {
    bookings : any[]
    updateDisplayBookings : boolean
    setBookingNumber : React.Dispatch<React.SetStateAction<string>>
    createArtistProfileInstance : (artist: string) => ethers.Contract
    artistProfileAddress : string
}
///////CLEAN UP ESCROW ADDDRESS STATE!!!
const BookingsList :FC<props> = ({
    bookings, 
    updateDisplayBookings, 
    setBookingNumber, 
    createArtistProfileInstance, 
    artistProfileAddress,
    }) : ReactElement => {

   
    const displayBooking = bookings.map((booking : any[]) =>  
        <Booking
        gigNumber= {(BigNumber.from(booking[0])).toString()}
        payment={(BigNumber.from(booking[1])).toString()}
        time= {(BigNumber.from(booking[2])).toString()}
        date = {booking[3]}
        venue = {booking[4]}
        setBookingNumber= {setBookingNumber}
        createArtistProfileInstance= {createArtistProfileInstance}
        artistProfileAddress= {artistProfileAddress}
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
