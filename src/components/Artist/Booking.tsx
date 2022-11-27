import React, {FC} from 'react'

type props = {
  payment : string,
  time : string,
  date : string,
  venue : string
}



const Booking : FC<props>= ({payment, time, date, venue}) => {
  return (
    <div className='Bookings'>
      <h4 className='Text'>{payment}</h4>
      <h4 className='Text'>{time}</h4>
      <h4 className='Text'>{date}</h4>
      <h4 className='Text'>{venue}</h4>
    </div>
  )
}

export default Booking
