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
        <motion.div
        initial= {{opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}}
        style={{
            height: "100%", 
            marginTop: "1%", 
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto"
        }}
        >   
            <h1
            style={{color: "#eaeaea", fontSize: "60px", textAlign: "center", position: "sticky"}}
            >Bookings</h1>
            <div
            className='BookingsDiv'
            style={{
                color: "grey", 
                fontSize: "23px",
                borderBottom: "dotted",
                borderColor: "white",
                borderWidth: "1px",
                position: "sticky"
                
            }}
            >
                <h4 style={{width: "100px"}}>Booking</h4>
                <h4 style={{width: "200px"}}>Venue</h4>
                <h4 style={{width: "200px"}}>Date</h4>
                <h4 style={{width: "200px"}}>Payment</h4>
                <h4 style={{width: "100px"}}>Time</h4>
                <h4 style={{width: "76px", color: "black"}}>Hidden</h4>
                
            </div>
            <motion.div 
            className='BookingsList'
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            exit= {{opacity: 0}}
            >
                {displayBooking}
            </motion.div>
           
        </motion.div>
    )
}

export default BookingsList
