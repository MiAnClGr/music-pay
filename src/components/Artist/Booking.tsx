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
    <div 
    className='Bookings'>
      <div
      className= "BookingsDiv">
        <h4 
        className='Text'
        style= {{width: "100px", textAlign: "center", fontSize: "20px", color: "grey"}}
        >{gigNumber}</h4>
        <h4 className='Text'
        style= {{width: "200px", textAlign: "center", fontSize: "18px"}}
        >{venue}</h4> 
        <h4 
        className='Text'
        style= {{width: "200px", textAlign: "center", fontSize: "18px"}}
        >{date}</h4>
        <h4 
        className='Text'
        style= {{width: "200px", textAlign: "center", fontSize: "18px"}}
        >${payment}</h4>
        <h4 
        className='Text'
        style= {{width: "100px", textAlign: "center", fontSize: "18px"}}
        >{time}</h4>
        <button 
        className='Submit'
        style={{width: "5%"}}
        onClick={handleSubmitAcceptBooking}
        >Accept</button>
      </div>
    
    </div>
    )
}

export default Booking
