import React, {FC, ReactElement, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import ArtistContext from '../../Context/ArtistContext'

type props = {
  gigNumber : string,
  payment : string,
  time : string,
  date : string,
  venue : string,
}

const Booking : FC<props>= ({
  gigNumber, 
  payment, 
  time,
  date, 
  venue, 
  }) : ReactElement => {

  const navigate = useNavigate()

  const {
    artistProfileAddress, 
    createArtistProfileInstance, 
    setBookingNumber
  } = useContext(ArtistContext)

  const handleSubmitAcceptBooking = async () => {
    setBookingNumber(gigNumber)
    const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
    navigate("/Loading")
    try{
      const transaction = await artistProfileContract.agreement(gigNumber)
      await transaction.wait()
      navigate("/Escrow")
    }catch(e){
      console.log("error")
    }finally{
      
    }   
  }
  
  return (
    <div className='Bookings'>
      <h4 className='Text'>No. {gigNumber}</h4>
      <h4 className='Text'>Payment: {payment}</h4>
      <h4 className='Text'>Time: {time}</h4>
      <h4 className='Text'>Date: {date}</h4>
      <h4 className='Text'>Venue: {venue}</h4>
    
      <button 
      className='Submit'
      style={{
        color: "white", 
        backgroundColor: "black",
        borderWidth: "1px",
        borderRadius: "5px", 
        fontWeight: "bold",
        fontSize: "12px",
        padding: "7px"
      }}
      onClick={handleSubmitAcceptBooking}
      >ACCEPT</button>
    </div>
    )
}

export default Booking
