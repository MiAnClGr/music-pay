import React, {useContext, useEffect} from 'react'
import BookingContext from '../../Context/BookingContext'
import Escrow from '../Booking/Escrow'
import BookingHeader from './BookingHeader'


/// Displays list of Escrow Contracts in which the user addres is assigned as the agent


const EscrowList = () => {

    /// access context variables and functions
    const {escrowList, getEscrowList} = useContext(BookingContext)


    /// maps the escrowList array to display each Escrow Contract
    const displayEscrow = escrowList.map((escrowAddress : string) => 
      <Escrow
      escrowAddress= {escrowAddress}
      />
    )

    /// calls getEscrowList on page load  
    useEffect(() => {
        getEscrowList()
    },[])

  return (
    <div>
      <BookingHeader/>
      <div
      className='EscrowList'
      >
        <div
        className='BookingsDiv'
        style={{
          color: "grey", 
          fontSize: "23px",
          borderBottom: "dotted",
          borderColor: "grey",
          borderWidth: "1px",
          position: "sticky",
          width: "100%",
          marginLeft: "auto", 
          marginRight: "auto",
            
        }}
        >
          <h4 style={{width: "100px", minWidth: "80px"}}>Artist</h4>
          <h4 style={{width: "200px", minWidth: "150px"}}>Venue</h4>
          <h4 style={{width: "200px", minWidth: "150px"}}>Date</h4>
          <h4 style={{width: "200px", minWidth: "150px"}}>Payment</h4>
          <h4 style={{width: "100px", minWidth: "80px"}}>Time</h4>
          <h4 style={{width: "6%", minWidth: "82px", color: "black"}}>Hidden</h4>
            
        </div>
    
        <div className='EscrowListDiv'>
            {displayEscrow}
        </div>
      </div>
    </div>
  )
}

export default EscrowList
