import React, {FC} from 'react'

type props = {
    bookingNumber : string
}

const Escrow : FC<props> = ({bookingNumber}) => {
  return (
    <div>
      <h1 className='Text'>ESCROW : {bookingNumber}</h1>
    </div>
  )
}

export default Escrow
