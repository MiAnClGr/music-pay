import React, {useContext, useEffect} from 'react'
import BookingContext from '../../Context/BookingContext'
import Escrow from '../Booking/Escrow'

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
        {displayEscrow}
    </div>
  )
}

export default EscrowList
