import React, {FC, ReactElement, useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import ArtistContext from '../../Context/ArtistContext'
import EscrowContext from '../../Context/EscrowContext'

/*
 * The booking component will display the details of a booking and allow the artist to accept or decline the booking.
 * It is displayed on the Bookings page and accepts props from the BookingList component.
 */

type props = {
  gigNumber : string,
  payment : string,
  time : string,
  date : string,
  venue : string,
  agreed : boolean,
  completed : boolean
}

const Booking : FC<props> = ({
  gigNumber, 
  payment, 
  time,
  date, 
  venue,
  agreed,
  completed 
  }) : ReactElement => {

    console.log(agreed)
    console.log(completed)

  const navigate = useNavigate()

  /// access context state variables and functions
  const {
    artistProfileAddress, 
    createArtistProfileInstance, 
    setBookingNumberArtist
  } = useContext(ArtistContext)
  const {setUserIsAgent} = useContext(EscrowContext)
  
  /// enum for booking status
  const enum status {
    NOT_ACCEPTED = "Not Accepted",
    IN_ESCROW = "In Escrow",
    COMPLETED = "Completed"
  }


  // state variables
  const [bookingAccepted, setBookingAccepted] = useState<boolean>(false)
  const [bookingCompleted, setBookingCompleted] = useState<boolean>(false)
  const [bookingStatus, setBookingStatus] = useState<status>(status.NOT_ACCEPTED)

/// User Actions

  /// submits the acceptence of the booking to the contract
  const handleSubmitAcceptBooking = async () => {
    setBookingNumberArtist(gigNumber)
    const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
    navigate("/Loading")
    try{
      // calling the agreement function on artistProfileContract will deploy a new BookingEscrow contract
      const transaction = await artistProfileContract.agreement(gigNumber)
      await transaction.wait()
      navigate("/EscrowMain")
    }catch(e){
      console.log("error")
    }finally{
      setUserIsAgent(false)
    }   
  }

  // will navigate to the escrow page if the booking has already been accepted
  const handleSubmitToEscrow = () => {
    setBookingNumberArtist(gigNumber)
    navigate("/EscrowMain")
  }

///Helper 

  // sets the booking status based on bookingAccepted and bookingCompleted
  const setStatus = () => {
    if(!bookingAccepted){
      setBookingStatus(status.NOT_ACCEPTED)
    }else if(bookingAccepted && !bookingCompleted){
      setBookingStatus(status.IN_ESCROW)
    }else if(bookingAccepted && bookingCompleted){
      setBookingStatus(status.COMPLETED)
    }
  }

  // updates bookingAccepted based on agreed
  const getBookingAccepted = () => {
    agreed ? setBookingAccepted(true) : setBookingAccepted(false)
  }

  //updates bookingCompleted based on completed
  const getBookingCompleted = () => {
    completed ? setBookingCompleted(true) : setBookingCompleted(false)
  }


// Effect hooks for fetching booking data and updating booking status.  

  useEffect(() => {
    getBookingAccepted()
    getBookingCompleted()
  }, [])

  useEffect(() => {
    setStatus()
  }, [bookingAccepted, bookingCompleted])

  
  return (
    <div 
    className='Bookings'>
      
      <div
      className= "BookingsDiv"
      >
        <h4 
        className='Text'
        style= {{width: "7.5%", textAlign: "center", fontSize: "20px", color: "grey"}}
        >{gigNumber}
        </h4>
        <h4 className='Text'
        style= {{width: "7.5%", textAlign: "center", fontSize: "18px"}}
        >{venue}
        </h4> 
        <h4 
        className='Text'
        style= {{width: "7.5%", textAlign: "center", fontSize: "18px"}}
        >{date}
        </h4>
        <h4 
        className='Text'
        style= {{width: "7.5%", textAlign: "center", fontSize: "18px"}}
        >${payment}
        </h4>
        <h4 
        className='Text'
        style= {{width: "7.5%", textAlign: "center", fontSize: "18px"}}
        >{time}
        </h4>
        <h4 
        className='Text'
        style= {{width: "7.5%", textAlign: "center", fontSize: "18px"}}
        >{bookingStatus}
        </h4>
        {bookingAccepted
        ?
          <button
          className='Submit'
          style={{width: "7.5%"}}
          onClick={handleSubmitToEscrow}
          >To Escrow</button>

        :  
          <button 
          className='Submit'
          style={{width: "7.5%"}}
          onClick={handleSubmitAcceptBooking}
          >Accept</button>
        
        }
      </div>
      
    
    </div>
    )
}

export default Booking
