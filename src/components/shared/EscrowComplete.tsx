import React from 'react'
import { useNavigate } from 'react-router'

const EscrowComplete = () => {

    const navigate = useNavigate()

  return (
    <div
    className='Complete'
    >
      <h3 className='Text' style={{fontSize: '40px'}}>The Payment has been finalised and the Escrow is complete </h3>
      <h3 className='Text' style={{fontSize: '40px'}}>Thank you for using Music-Pay</h3>
      <br></br>
        <br></br>
        <button
        className='Submit'
        style={{
            color: "white", 
            opacity: "0.8",
            backgroundColor: "black", 
            width: "20%",
            borderStyle: "solid",
            borderColor: "grey",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "12px",
            padding: "12px",
            textDecoration: "none"
        }}
        onClick={() => navigate('/RoutingUser') }
        >
            HOME
        </button>
    </div>
  )
}

export default EscrowComplete
