import React, {FC, ReactElement, useContext} from 'react'
import {BigNumber} from 'ethers'
import Booking from './Booking'
import ArtistContext from '../../Context/ArtistContext'
import {motion} from 'framer-motion'

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
            <motion.div 
            className='BookingsList'
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            exit= {{opacity: 0}}
            >
                {displayBooking}
            </motion.div>
            :
            <></>
            }
        </div>
    )
}

export default BookingsList
