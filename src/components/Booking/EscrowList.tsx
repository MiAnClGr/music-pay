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
    <div
    className='EscrowList'
    >
        <h1
        style={{
          color: "#eaeaea", 
          fontSize: "60px", 
          textAlign: "center",
          marginBottom: "0",
          paddingBottom: "40.2px", 
          borderStyle: "dotted",
          borderRight: "hidden",
          borderLeft: "hidden",
          borderTop: "hidden",
          borderWidth: "1px",
          borderColor: "grey"
        }}
        >Current Escrows</h1>
      <div className='EscrowListDiv'>
          {displayEscrow}
      </div>
    </div>
  )
}

export default EscrowList
