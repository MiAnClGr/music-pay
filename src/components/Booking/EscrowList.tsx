import React, {useContext, useEffect} from 'react'
import BookingContext from '../../Context/BookingContext'
import Escrow from '../Booking/Escrow'

const EscrowList = () => {

    const {escrowList, getEscrowList } = useContext(BookingContext)

    const displayEscrow = escrowList.map((escrowaddress : string) => 
            <Escrow
            escrowAddress= {escrowaddress}
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
