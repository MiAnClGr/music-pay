import React, {FC, ReactElement, useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { ethers, Contract } from 'ethers'
import BookingContext from '../../Context/BookingContext'
import EscrowContext from '../../Context/EscrowContext'
import EscrowABI from '../../ABI/BookingEscrow'
import {signer} from '../../Contracts/ContractObjects'

type props = {
  escrowAddress : string
}

const Escrow : FC<props>= ({escrowAddress}) : ReactElement => {

  const navigate = useNavigate()

  /// access context variables and functions
  const {setEscrowAddressAgent} = useContext(BookingContext)
  const {setUserIsAgent} = useContext(EscrowContext)

  /// state variables
  const [payment, setPayment] = useState<number>()
  const [artistName, setArtistName] = useState<string>("")
  const [venueName, setVenueName] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<number>()
  
 

  

/// User Actions

  /// loads the main Escrow page for the agent  
  const handleSubmitLoadEscrowAgent = async (escrowAddress : string) => {
    setUserIsAgent(true)
    setEscrowAddressAgent(escrowAddress)
    navigate("/EscrowMain") 
  }

/// Helper Functions  

  /// create instance of Escrow contract
  const createEscrowInstance = () => {
    const EscrowContract : Contract = new ethers.Contract(escrowAddress, EscrowABI, signer) 
    return EscrowContract
  }

  /// sets the EscrowContract
  const EscrowContract = createEscrowInstance()

  /// fetches the artist name from the Escrow Contract
  const getArtistName = async () => {
    const name = await EscrowContract.artistName()
    setArtistName(name)
  }

  /// fetches the venue name from the Escrow Contract
  const getVenue = async () => {
    const venue = await EscrowContract.venueName()
    setVenueName(venue)
  }

  /// fetches the date from the Escrow Contract
  const getDate = async () => {
    const date = await EscrowContract.date()
    setDate(date)
  }

  /// fetches the time from the Escrow Contract
  const getTime = async () => {
    const time = await EscrowContract.time()
    setTime(time.toNumber())
  }

  /// fetches the payment from the Escrow Contract
  const getPayment = async () => {
    const payment = await EscrowContract.payment()
    setPayment(payment.toNumber())
  }

 
  
  /// create instance of Escrow Contract on component load
  useEffect(() => {
    createEscrowInstance()
  }, [])

  /// fetches the artist name, venue name, date, time, and payment from the Escrow Contract on component load
  useEffect(() => {
    getArtistName()
    getVenue()
    getDate()
    getTime()
    getPayment()
  },[])
  
  return (
    <div 
    className='Escrow'>
      <h4 className='Text'
      style= {{width: "100px", minWidth: "80px", textAlign: "center", fontSize: "18px"}}
      >{artistName}</h4>
      <h4 className='Text'
      style= {{width: "200px", minWidth: "80px", textAlign: "center", fontSize: "18px"}}
      >{venueName}</h4>  
      <h4 className='Text'
      style= {{width: "200px", minWidth: "80px", textAlign: "center", fontSize: "18px"}}
      >{date}</h4> 
      <h4 
      className='Text'
      style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
      >${payment}</h4>
      <h4 className='Text'
      style= {{width: "100px", minWidth: "80px", textAlign: "center", fontSize: "18px"}}
      >{time}</h4> 
      
      <button 
      className='Submit'
      style={{height: "50%", width: "6%", minWidth: "100px"}}
      onClick={() => handleSubmitLoadEscrowAgent(escrowAddress)}
      >Open</button>
    </div>
    )
}

export default Escrow
