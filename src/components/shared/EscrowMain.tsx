  import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import {ethers, utils, Contract} from 'ethers'
import EscrowABI from '../../ABI/BookingEscrow'
import {MockDai, signer} from "../../Contracts/ContractObjects"
import ArtistContext from '../../Context/ArtistContext'

const EscrowMain : FC = () : ReactElement => {

    const [artistName, setArtistName] = useState("")
    const [bookingAgentName, setBookingAgentName] = useState("")
    const [escrowState, setEscrowState] = useState<number>(0)
    
    const {bookingNumberArtist, escrowAddress, getEscrowAddress} = useContext(ArtistContext)

    console.log(escrowAddress)

    const createEscrowInstance = () => {
        const EscrowContract : Contract = new ethers.Contract(escrowAddress, EscrowABI, signer)
        console.log(EscrowContract)
        return EscrowContract
    }

    const getArtistName = async () => {
      const EscrowContract = createEscrowInstance()
      const name = await EscrowContract.artistName()
      console.log(name)
      setArtistName(name)
    }

    const getBookingAgentName = async () => {
      const EscrowContract = createEscrowInstance()
      const bookingAgentName = await EscrowContract.bookingAgentName()
      setBookingAgentName(bookingAgentName)
    }

    const payDeposit = async () => {
      const EscrowContract = createEscrowInstance()
      const deposit = await EscrowContract.payment()/5
      try{
        const approval = await MockDai.approve(escrowAddress, utils.parseEther(deposit.toString()) )
        await approval.wait()
      }catch(error){
        console.log(error)
      }finally{
        finaliseDeposit()
      }
    }

    const finaliseDeposit = async () =>{
      const EscrowContract = createEscrowInstance()
      try{
        const pay = await EscrowContract.payDeposit()
        await pay.wait()
      }catch(error){
        console.log(error)
      }finally{
        console.log("payment complete")
      }
    }

    const confirmPerformance = async () => {
      const EscrowContract = createEscrowInstance()
      await EscrowContract.confirmPerformance()
    }

    const finalisePayment = async () => {
      const EscrowContract = createEscrowInstance()
      await EscrowContract.finalisePayment()
    }

    const confirmPayment = async () => {
      const EscrowContract = createEscrowInstance()
      await EscrowContract.confirmPayment()
    }

    const completeBooking = async () => {
      const EscrowContract = createEscrowInstance()
      await EscrowContract.completeBooking()
    }

    const getCurrentState = async () => {
      const EscrowContract = createEscrowInstance()
      const state = await EscrowContract.currentState()
      setEscrowState(state)
    }

    

    // const determineState = async () => {
    //   const EscrowContract = createEscrowInstance()
    //   if(EscrowContract.currentState)
    // }

    console.log(artistName)
    console.log(escrowState)

    useEffect(() => {
        getEscrowAddress()
    },[])

    useEffect(() => {
      getArtistName()
      getBookingAgentName()
      getCurrentState()
    }, [escrowAddress])


  return (
    <div className='EscrowMain'>
      <h1 
      className='HeaderText'
      style={{fontSize: "60px"}}
      >ESCROW</h1>
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
