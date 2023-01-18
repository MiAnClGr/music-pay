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

  const navigate = useNavigate()

  const {
    artistProfileAddress, 
    createArtistProfileInstance, 
    setBookingNumberArtist
  } = useContext(ArtistContext)

  const {setUserIsAgent} = useContext(EscrowContext)

  const [bookingAccepted, setBookingAccepted] = useState(false)
  const [bookingCompleted, setBookingCompleted] = useState(false)

  const getBookingAccepted = () => {
    agreed ? setBookingAccepted(true) : setBookingAccepted(false)
  }

  const getBookingCompleted = () => {
    completed ? setBookingCompleted(true) : setBookingCompleted(false)
  }

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
  }, [])

  //////FINISH DISPLAY IF BOOKING COMPLETED <BookingsDiv> with "Completed"
  
  return (
    <div 
    className='Bookings'>
      <div
      className= "BookingsDiv">
        <h4 
        className='Text'
        style= {{width: "100px", minWidth: "80px", textAlign: "center", fontSize: "20px", color: "grey"}}
        >{gigNumber}</h4>
        <h4 className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >{venue}</h4> 
        <h4 
        className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >{date}</h4>
        <h4 
        className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >${payment}</h4>
        <h4 
        className='Text'
        style= {{width: "100px", minWidth: "80px", textAlign: "center", fontSize: "18px"}}
        >{time}</h4>
        {bookingAccepted
        ?
          <button
          className='Submit'
          style={{width: "6%", minWidth: "80px"}}
          onClick={handleSubmitToEscrow}
          >To Escrow</button>

        :  
          <button 
          className='Submit'
          style={{width: "6%", minWidth: "80px"}}
          onClick={handleSubmitAcceptBooking}
          >Accept</button>
        
        }
      </div>
    
    </div>
    )
}

export default Booking
