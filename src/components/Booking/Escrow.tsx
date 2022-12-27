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
  const [artistName, setArtistName] = useState("")
  
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

  const getPayment = async () => {
    const payment = await EscrowContract.payment()
    setPayment(payment.toNumber())
  }


  const handleSubmitAcceptBooking = async () => {
    setUserIsAgent(true)
    setEscrowAddressAgent(escrowAddress)
    navigate("/EscrowMain") 
  }

  useEffect(() => {
    createEscrowInstance()
  }, [])


  useEffect(() => {
    getArtistName()
    getPayment()
  })
  
  return (
    <div 
    className='Escrow'>
      <div
      className= "EscrowDiv">
        
        <h4 className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >{artistName}</h4> 
        <h4 
        className='Text'
        style= {{width: "200px", minWidth: "150px", textAlign: "center", fontSize: "18px"}}
        >${payment}</h4>
       
        <button 
        className='Submit'
        style={{width: "6%", minWidth: "80px"}}
        onClick={handleSubmitAcceptBooking}
        >Open</button>
      </div>
    
    </div>
    )
}

export default Escrow
