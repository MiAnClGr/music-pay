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

  const [payment, setPayment] = useState<number>()
  const [artistName, setArtistName] = useState<string>("")
  const [venueName, setVenueName] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<number>()
  
  const {setEscrowAddressAgent} = useContext(BookingContext)

  const {setUserIsAgent} = useContext(EscrowContext)

  const createEscrowInstance = () => {
    const EscrowContract : Contract = new ethers.Contract(escrowAddress, EscrowABI, signer) 
    return EscrowContract
  }

  const EscrowContract = createEscrowInstance()

  const getArtistName = async () => {
    const name = await EscrowContract.artistName()
    setArtistName(name)
  }

  const getVenue = async () => {
    const venue = await EscrowContract.venueName()
    setVenueName(venue)
  }

  const getDate = async () => {
    const date = await EscrowContract.date()
    setDate(date)
  }

  const getTime = async () => {
    const time = await EscrowContract.time()
    setTime(time.toNumber())
  }

  const getPayment = async () => {
    const payment = await EscrowContract.payment()
    setPayment(payment.toNumber())
  }

  const handleSubmitLoadEscrowAgent = async (escrowAddress : string) => {
    setUserIsAgent(true)
    setEscrowAddressAgent(escrowAddress)
    navigate("/EscrowMain") 
  }
  

  useEffect(() => {
    createEscrowInstance()
  }, [])


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
