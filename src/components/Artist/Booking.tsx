import React, {FC, ReactElement} from 'react'
import {ethers} from 'ethers'
import {useNavigate} from 'react-router-dom'

type props = {
  gigNumber : string,
  payment : string,
  time : string,
  date : string,
  venue : string,
  setBookingNumber : React.Dispatch<React.SetStateAction<string>>
  createArtistProfileInstance : (artist: string) => ethers.Contract
  artistProfileAddress : string
}

const Booking : FC<props>= ({
  gigNumber, 
  payment, 
  time,
  date, 
  venue, 
  setBookingNumber, 
  createArtistProfileInstance, 
  artistProfileAddress
  }) : ReactElement => {


  
  const navigate = useNavigate()



  const handleSubmitAccept = async () => {
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
      <br></br>
      <button 
      className='Submit'
      onClick={handleSubmitAccept}
      >Accept</button>
    </div>
    )
}

export default Booking
