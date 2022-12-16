import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import {ethers, Contract} from 'ethers'
import EscrowABI from '../../ABI/BookingEscrow'
import {ArtistFactoryContract, signer} from "../../Contracts/ContractObjects"
import ArtistContext from '../../Context/ArtistContext'

const Escrow : FC = () : ReactElement => {

    const [artistName, setArtistName] = useState("")
    const [artist, setArtist] = useState("")
    const [bookingAgent, setBookingAgent] = useState("")
    const [bookingAgentName, setBookingAgentName] = useState("")

    const {bookingNumber, escrowAddress, getEscrowAddress} = useContext(ArtistContext)

    const createEscrowInstance = () => {
        const EscrowContract : Contract = new ethers.Contract(escrowAddress, EscrowABI, signer)
        console.log(EscrowContract)
        return EscrowContract
    }

    const getArtistName = async () => {
      const name = await ArtistFactoryContract.artistAddressToName(artist)
      setArtistName(name)
    }

    const getArtist = async () => {
      const EscrowContract = createEscrowInstance()
      const artist = await EscrowContract.artist()
      setArtist(artist)
    } 

    const getBookingAgent = async () => {
      const EscrowContract = createEscrowInstance()
      const bookingAgent = await EscrowContract.bookingAgent()
      setBookingAgent(bookingAgent)
    } 

    const getBookingAgentName = async () => {
      const EscrowContract = createEscrowInstance()
      const bookingAgentName = await EscrowContract.bookingAgentName()
      setBookingAgentName(bookingAgentName)
    }

    const payDeposit = async () => {
      const EscrowContract = createEscrowInstance()
      await EscrowContract.payDeposit()
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

    useEffect(() => {
        getEscrowAddress()
    },[])

    useEffect(() => {
      getArtist()
      getBookingAgent()
      getArtistName()
      getBookingAgentName()
    }, [escrowAddress])


  return (
    <div className='Escrow'>
      <h1 
      className='HeaderText'
      style={{fontSize: "60px"}}
      >ESCROW</h1>
      <br></br>
      <br></br>
      <div className='EscrowDiv'>
        <h3 className='Text' style={{fontSize: "25px"}}>Booking Number: {bookingNumber}</h3>
        <h3 className='Text' style={{fontSize: "25px"}}>Artist : {artistName}</h3>
        <h3 className='Text' style={{fontSize: "25px"}}>Booking Agent: {bookingAgentName}</h3>
      </div>
      <div
      className= "EscrowDiv"
      >
        <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 1:</h3>
        <h3 className='Text' style={{width: "80%", fontSize: "18px"}}>Booking agent to pay deposit</h3>
        <button 
        className='Submit'
        onClick={payDeposit}
        >Pay
        </button>
      </div>
      <div
      className= "EscrowDiv"
      >
        <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 2:</h3>
        <h3 className='Text' style={{width: "80%", fontSize: "18px"}}>Artist to confirm performance</h3>
        <button 
        className='Submit'
        onClick={confirmPerformance}
        >Confirm
        </button>
      </div>
      <div
      className= "EscrowDiv"
      >
        <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 3:</h3>
        <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>Booking Agent to confirm performance</h3>
        <button 
        className='Submit'
        onClick={confirmPerformance}
        >Confirm
        </button>
      </div>
      <div
      className= "EscrowDiv"
      >
        <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 4:</h3>
        <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>Booking Agent to finalise payment</h3>
        <button 
        className='Submit'
        onClick={finalisePayment}
        >Confirm
        </button>
      </div>
      <div
      className= "EscrowDiv"
      >
        <h3 className='Text' style={{width: "20%", color: "grey", fontSize: "20px"}}> Step 5:</h3>
        <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>Artist to confirm payment</h3>
        <button 
        className='Submit'
        onClick={confirmPayment}
        >Confirm
        </button>
      </div>
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

export default Escrow
