import React, {FC, ReactElement, useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import ArtistContext from '../../Context/ArtistContext'
import EscrowContext from '../../Context/EscrowContext'

type props = {
  gigNumber : string,
  payment : string,
  time : string,
  date : string,
  venue : string,
  agreed : boolean,
  completed : boolean
}

const Booking : FC<props>= ({
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

  const {
    artistProfileAddress, 
    createArtistProfileInstance, 
    setBookingNumberArtist
  } = useContext(ArtistContext)

  const {setUserIsAgent} = useContext(EscrowContext)

  const enum status {
    NOT_ACCEPTED = "Not Accepted",
    IN_ESCROW = "In Escrow",
    COMPLETED = "Completed"
  }

  const [bookingAccepted, setBookingAccepted] = useState<boolean>(false)
  const [bookingCompleted, setBookingCompleted] = useState<boolean>(false)
  const [bookingStatus, setBookingStatus] = useState<status>(status.NOT_ACCEPTED)

  const getBookingAccepted = () => {
    agreed ? setBookingAccepted(true) : setBookingAccepted(false)
  }

  const getBookingCompleted = () => {
    completed ? setBookingCompleted(true) : setBookingCompleted(false)
  }

  const setStatus = () => {
    if(!bookingAccepted){
      setBookingStatus(status.NOT_ACCEPTED)
    }else if(bookingAccepted && !bookingCompleted){
      setBookingStatus(status.IN_ESCROW)
    }else if(bookingAccepted && bookingCompleted){
      setBookingStatus(status.COMPLETED)
    }
  }

  console.log(bookingStatus)

  const handleSubmitAcceptBooking = async () => {
    setBookingNumberArtist(gigNumber)
    const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
    navigate("/Loading")
    try{
      const transaction = await artistProfileContract.agreement(gigNumber)
      await transaction.wait()
      navigate("/EscrowMain")
    }catch(e){
      console.log("error")
    }finally{
      setUserIsAgent(false)
    }   
  }

  const handleSubmitToEscrow = () => {
    setBookingNumberArtist(gigNumber)
    navigate("/EscrowMain")
  }

  useEffect(() => {
    getBookingAccepted()
    getBookingCompleted()
    setStatus()
  }, [])

  //////FINISH DISPLAY IF BOOKING COMPLETED <BookingsDiv> with "Completed"
  
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
