import React, {FC, ReactElement, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import ArtistContext from '../../Context/ArtistContext'

type props = {
  escrowAddress : string
}

const Escrow : FC<props>= ({escrowAddress}) : ReactElement => {

  const navigate = useNavigate()

  console.log(escrowAddress)



  const handleSubmitAcceptBooking = async () => {
    navigate("/EscrowMain") 
  }
  
  return (
    <div 
    className='Escrow'>
      <div
      className= "EscrowDiv">
        <h1 className='Text'>{escrowAddress}</h1>
        {/* <h4 
        className='Text'
        style= {{width: "100px", minWidth: "80px", textAlign: "center", fontSize: "20px", color: "grey"}}
        >{gigNumber}</h4>
        <h4 className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >{venue}</h4> 
        <h4 
        className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >{date}</h4>
        <h4 
        className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >${payment}</h4>
        <h4 
        className='Text'
        style= {{width: "100px", minWidth: "80px", textAlign: "center", fontSize: "18px"}}
        >{time}</h4> */}
        <button 
        className='Submit'
        style={{width: "6%", minWidth: "80px"}}
        onClick={handleSubmitAcceptBooking}
        >Accept</button>
      </div>
    
    </div>
    )
}

export default Escrow
