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
        <h1
        style={{color: "#eaeaea", fontSize: "60px", textAlign: "center", position: "sticky"}}
        >Current Escrows</h1>
      <div className='EscrowList'>
          {displayEscrow}
      </div>
    </div>
  )
}

export default EscrowList
