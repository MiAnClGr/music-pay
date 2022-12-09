import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import {ethers, Contract} from 'ethers'
import EscrowABI from '../../ABI/BookingEscrow'
import {ArtistFactoryContract, signer} from "../../contracts/ContractObjects"
import ArtistContext from '../../context/ArtistContext'


type props = {
    bookingNumber : string
    escrowAddress : string
    setEscrowAddress : React.Dispatch<React.SetStateAction<string>>
   
}

const Escrow : FC<props> = ({
    bookingNumber, 
    escrowAddress, 
    setEscrowAddress,
    }) : ReactElement => {

    const [artistName, setArtistName] = useState("")
    const [artist, setArtist] = useState("")
    const [bookingAgent, setBookingAgent] = useState("")
    const [bookingAgentName, setBookingAgentName] = useState("")

    const {artistProfileAddress, createArtistProfileInstance} = useContext(ArtistContext)

    const createEscrowInstance = () => {
        const EscrowContract : Contract = new ethers.Contract(escrowAddress, EscrowABI, signer)
        console.log(EscrowContract)
        return EscrowContract
    }

    const getEscrowAddress = () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        artistProfileContract.on("EscrowCreated", (escrowAddress => {
            setEscrowAddress(escrowAddress)
          }))
    }

    const getArtistName = async () => {
      const name = await ArtistFactoryContract.artistByAddress(artist)
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


    

    getArtist()
    getBookingAgent()
    getArtistName()
    getBookingAgentName()

    console.log(artist)
    console.log(bookingAgent)
    console.log(artistName)
    console.log(bookingAgentName)



    console.log(escrowAddress)
    console.log(bookingNumber)

    const getAddressess = async () => {
        const EscrowContract = createEscrowInstance()
        console.log(await EscrowContract.artist())
        console.log(await EscrowContract.bookingAgent())
        console.log(await EscrowContract.gigNumber())
    }

    useEffect(() => {
        getEscrowAddress()
    },[])

    useEffect(() => {
        getAddressess()
    }, [escrowAddress])


  return (
    <div className='Escrow'>
      <h1 className='HeaderText'>ESCROW</h1>
      <h3 className='Text'>Booking Number: {bookingNumber}</h3>
      <h3 className='Text'>Artist : {artistName}</h3>
      <h3 className='Text'>Booking Agent: {bookingAgentName}</h3>
      <br></br>
      <h3 className='Text'> Step 1: Artist to accept Booking</h3>
      <button className='Submit'>Accept</button>
      <h3 className='Text'> Step 2: Booking agent to pay deposit</h3>
      <button className='Submit'>Pay</button>
      <h3 className='Text'> Step 3: Artist to confirm performance </h3>
      <button className='Submit'>Confirm</button>
      <h3 className='Text'> Step 4: Booking Agent to confirm performance </h3>
      <button className='Submit'>Confirm</button>
      <h3 className='Text'> Step 5: Booking Agent to finalise payment </h3>
      <button className='Submit'>Confirm</button>
      <h3 className='Text'> Step 6: Artist to confirm payment </h3>
      <button className='Submit'>Confirm</button>
      <br></br>
      <br></br>
      <br></br>
      <button className='Submit'>Complete Booking</button>
    </div>
  )
}

export default Escrow
