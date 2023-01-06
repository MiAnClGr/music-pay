import React, {useContext, useEffect} from 'react'
import BookingContext from '../../Context/BookingContext'
import Escrow from '../Booking/Escrow'
import BookingHeader from './BookingHeader'

const EscrowList = () => {

    const {escrowList, getEscrowList} = useContext(BookingContext)

    const displayEscrow = escrowList.map((escrowAddress : string) => 
      <Escrow
      escrowAddress= {escrowAddress}
      />
    )
       
    

    useEffect(() => {
        getEscrowList()
    },[])

    
  return (
    <div>
      <BookingHeader/>
      <div
      className='EscrowList'
      style={{
      borderStyle: "dotted",
      borderRight: "hidden",
      borderLeft: "hidden",
      borderTop: "hidden",
      borderWidth: "1px",
      borderColor: "grey"
      }}
      >
        <div className='EscrowListDiv'>
            {displayEscrow}
        </div>
      </div>
    </div>
  )
}

export default EscrowList
