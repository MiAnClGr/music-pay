import React, {FC, ReactElement} from 'react'
import BookingHeader from "../shared/BookingHeader"

type props = {
  setArtistAddress : React.Dispatch<React.SetStateAction<string>>
}

const BookingMain : FC<props> = ({setArtistAddress}) : ReactElement => {

  return (
    <>
      <BookingHeader
      setArtistAddress={setArtistAddress}
      />
      <div style= {{textAlign: 'center', marginTop: '250px'}}>
            <h3 
            className='Text'
            style= {{fontSize: '60px'}}
            >Welcome to Music-Pay for Bookings</h3>
        </div>
    </>
  )
}

export default BookingMain
