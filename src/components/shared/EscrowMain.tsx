  import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import {utils} from 'ethers'
import {MockDai, signer} from "../../Contracts/ContractObjects"
import ArtistContext from '../../Context/ArtistContext'
import BookingContext from '../../Context/BookingContext'
import EscrowContext from '../../Context/EscrowContext'

const EscrowMain : FC = () : ReactElement => {

  const {
    bookingNumberArtist, 
    escrowAddressArtist, 
    getEscrowAddressArtist, 
    EscrowContractArtist
  } = useContext(ArtistContext)

  const {
    escrowAddressAgent, 
    EscrowContractAgent
  } = useContext(BookingContext)

  const {
    artistName, 
    getArtistName, 
    userIsAgent,
    bookingAgentName,
    getBookingAgentName,
    getCurrentState,
    escrowState
  } = useContext(EscrowContext)

  const currentContract = userIsAgent ? EscrowContractAgent : EscrowContractArtist
  const currentAddress = userIsAgent ? escrowAddressAgent : escrowAddressArtist

  console.log(currentContract)
  console.log(currentAddress)
  console.log(escrowAddressAgent)
  
  const payDeposit = async () => {
    const deposit = await EscrowContractAgent.payment()/5
    try{
      const approval = await MockDai.approve(escrowAddressAgent, utils.parseEther(deposit.toString()) )
      await approval.wait()
    }catch(error){
      console.log(error)
    }finally{
      finaliseDeposit()
    }
  }

  const finaliseDeposit = async () =>{
    try{
      const pay = await EscrowContractAgent.payDeposit()
      await pay.wait()
    }catch(error){
      console.log(error)
    }finally{
      console.log("payment complete")
    }
  }

  const confirmPerformance = async () => {
    await EscrowContractArtist.confirmPerformance()
    await EscrowContractAgent.confirmPerformance()
  }

  const finalisePayment = async () => {
    await EscrowContractAgent.finalisePayment()
  }

  const confirmPayment = async () => {
    await EscrowContractArtist.confirmPayment()
  }

  const completeBooking = async () => {
    await EscrowContractArtist.completeBooking()
  }
  

  useEffect(() => {
      getEscrowAddressArtist()
      console.log(escrowAddressArtist)
  },[])

  ///Determine is user is agent or artist

  useEffect(() => {
    getArtistName(currentContract)
    getBookingAgentName(currentContract)
    getCurrentState(currentContract)
  }, [currentAddress])


  return (
    <div className='EscrowMain'>
      <h1 
      className='HeaderText'
      style={{fontSize: "60px"}}
      >ESCROW</h1>
      {userIsAgent
      ?
      <h3 
      className='Text'
      style={{fontSize: "20px"}}
      >Viewing as: Agent
      </h3>
      :
      <h3 
      className='Text'
      style={{fontSize: "20px"}}
      >Viewing as: Artist
      </h3>
      }
      <br></br>
      <br></br>
      <div className='EscrowMainDiv'>
        <h3 className='Text' style={{fontSize: "25px"}}>Booking Number: {bookingNumberArtist}</h3>
        <h3 className='Text' style={{fontSize: "25px"}}>Artist : {artistName}</h3>
        <h3 className='Text' style={{fontSize: "25px"}}>Booking Agent: {bookingAgentName}</h3>
      </div>
      <div
      className= "EscrowMainDiv"
      >
        <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 1:</h3>
        <h3 className='Text' style={{width: "80%", fontSize: "18px"}}>Booking agent to pay deposit</h3>

        {(escrowState == 1)
        ?
        <h3 className='Text' style= {{fontSize: "18px"}}>Completed</h3>
        :
        <button 
        className='Submit'
        onClick={payDeposit}
        >Pay
        </button>
        }
         

      </div>
      {(escrowState == 1)
      ?
        <div
        className= "EscrowMainDiv"
        >
          <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 2:</h3>
          <h3 className='Text' style={{width: "80%", fontSize: "18px"}}>Artist to confirm performance</h3>
          
          <button 
          className='Submit'
          onClick={confirmPerformance}
          >Confirm
          </button>
        </div>
      :
      <></>
      }
      {(escrowState == 2)
      ?
        <div
        className= "EscrowMainDiv"
        >
          <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 3:</h3>
          <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>Booking Agent to confirm performance</h3>
          <button 
          className='Submit'
          onClick={confirmPerformance}
          >Confirm
          </button>
        </div>
      :
      <></>
      }
      {(escrowState == 4)
      ?
        <div
        className= "EscrowMainDiv"
        >
          <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 4:</h3>
          <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>Booking Agent to finalise payment</h3>
          <button 
          className='Submit'
          onClick={finalisePayment}
          >Confirm
          </button>
        </div>
      :
      <></>
      }
      {(escrowState == 5)
      ?
        <div
        className= "EscrowMainDiv"
        >
          <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 5:</h3>
          <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>Artist to confirm payment</h3>
          <button 
          className='Submit'
          onClick={confirmPayment}
          >Confirm
          </button>
        </div>
      :
      <></>
      }
      <br></br>
      <br></br>
      <br></br>
      <button 
      className='Submit'
      onClick={completeBooking}
      >Complete Booking
      </button>
    </div>
  )
}

export default EscrowMain
