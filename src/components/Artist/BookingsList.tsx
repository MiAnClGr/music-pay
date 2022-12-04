import React, {FC, ReactElement} from 'react'
import {ethers, BigNumber} from 'ethers'
import Booking from './Booking'

type props = {
    bookings : any[]
    updateDisplayBookings : boolean
    setBookingNumber : React.Dispatch<React.SetStateAction<string>>
    createArtistProfileInstance : (artist: string) => ethers.Contract
    artistProfileAddress : string
    setEscrowAddress : React.Dispatch<React.SetStateAction<string>>
}

const BookingsList :FC<props> = ({
    bookings, 
    updateDisplayBookings, 
    setBookingNumber, 
    createArtistProfileInstance, 
    artistProfileAddress,
    setEscrowAddress
    }) : ReactElement => {

    const hexify = (s : string) => {
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
        date = {hexify(booking[3])}
        venue = {hexify(booking[4])}
        setBookingNumber= {setBookingNumber}
        createArtistProfileInstance= {createArtistProfileInstance}
        artistProfileAddress= {artistProfileAddress}
        setEscrowAddress= {setEscrowAddress}
        />
    )
    
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
