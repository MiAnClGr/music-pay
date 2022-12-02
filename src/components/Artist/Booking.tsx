import React, {FC, ReactElement} from 'react'

type props = {
  gigNumber : string,
  payment : string,
  time : string,
  date : string,
  venue : string
}

const Booking : FC<props>= ({gigNumber, payment, time, date, venue}) : ReactElement => {

  return (
    <div className='Bookings'>
      <h4 className='Text'>No. {gigNumber}</h4>
      <h4 className='Text'>Payment: {payment}</h4>
      <h4 className='Text'>Time: {time}</h4>
      <h4 className='Text'>Date: {date}</h4>
      <h4 className='Text'>Venue: {venue}</h4>
      <br></br>
      <button className='Submit'>Accept</button>
    </div>
    )
}

export default Booking
