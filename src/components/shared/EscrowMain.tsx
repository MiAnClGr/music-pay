import React, {FC, useState, useEffect, useContext, ReactElement} from 'react'
import {utils} from 'ethers'
import {ArtistFactoryContract, MockDai, signer} from "../../Contracts/ContractObjects"
import ArtistContext from '../../Context/ArtistContext'
import BookingContext from '../../Context/BookingContext'
import EscrowContext from '../../Context/EscrowContext'
import ArtistInfo from '../Artist/ArtistInfo'
import { useNavigate } from 'react-router'
import {motion} from 'framer-motion'
import ArtistHeader from '../Artist/ArtistHeader'
import BookingHeader from '../Booking/BookingHeader'


const EscrowMain : FC = () : ReactElement => {

  const navigate = useNavigate()

  const {
    bookingNumberArtist, 
    escrowAddressArtist, 
    getEscrowAddressArtist, 
    createEscrowInstanceArtist,
    isHovering
  } = useContext(ArtistContext)

  const {
    escrowAddressAgent, 
    createEscrowInstanceAgent,
    setEscrowAddressAgent
  } = useContext(BookingContext)

  const {
    artistName, 
    getArtistName,
    artistAddress,
    getArtistAddress, 
    userIsAgent,
    setUserIsAgent,
    bookingAgentName,
    getBookingAgentName,
    getCurrentState,
    escrowState,
    venue,
    getVenue,
    payment,
    getPayment,
    date,
    getDate
  } = useContext(EscrowContext)


  console.log(escrowAddressAgent)
  console.log(escrowState)
  console.log(artistAddress)

  const [balance, setBalance] = useState<number>(0)

  const getBalance = async () => {
    const bal = await currentContract.getBalance()
    setBalance(bal)
  }

  const [deposit, setDeposit] = useState<number>()

  const getDeposit = async () => {
    const payment = await currentContract.payment()
    const dep = payment /5
    setDeposit(dep)
  }

  const [currentUser, setCurrentUser] = useState<string>("")
  const [isUserArtist, setIsUserArtist] = useState<boolean>(false)
  const [isUserAgent, setIsUserAgent] = useState<boolean>(false)

  const EscrowContractAgent = createEscrowInstanceAgent()
  const EscrowContractArtist = createEscrowInstanceArtist()

  const currentContract = isUserAgent ? EscrowContractAgent : EscrowContractArtist
  const currentAddress = isUserAgent ? escrowAddressAgent : escrowAddressArtist

  console.log(currentContract)
  console.log(currentAddress)

///Determine if user is agent or artist

  const getCurrentUser = async () => {
    const user = await signer.getAddress()
    console.log(user)
    const artist = await currentContract.artist()
    const agent = await currentContract.bookingAgent()
    if(user === artist){
      setIsUserArtist(true)
      setIsUserAgent(false)
      setCurrentUser(artistName)
    }else if(user === agent){
      setIsUserAgent(true)
      setIsUserArtist(false)
      setCurrentUser(bookingAgentName)
    }
  }

  console.log(`current user is ${currentUser}`)
  console.log(`is user artist? ${isUserArtist}`)
  console.log(`is user agent? ${isUserAgent}`)

/// Paying Deposit
  
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
    navigate("/Loading")
    try{
      const pay = await EscrowContractAgent.payDeposit()
      await pay.wait()
    }catch(error){
      console.log(error)
    }finally{
      console.log("payment complete")
      setUserIsAgent(true)
      setEscrowAddressAgent(currentAddress)
      navigate("/EscrowMain")
    }
  }

///Confirming the Performance

  const confirmPerformanceArtist = async () => {
    navigate("/Loading")
    try{
      const confirm = await currentContract.confirmPerformanceArtist()
      await confirm.wait()
    }catch(error){
      console.log(error)
    }finally{
      console.log("Artist has confirmed performance")
      navigate("/EscrowMain")
    }
  }

  const confirmPerformanceAgent = async () => {
    navigate("/Loading")
    try{
      const confirm = await currentContract.confirmPerformanceAgent()
      await confirm.wait()
    }catch(error){
      console.log(error)
    }finally{
      console.log("Agent has confirmed performance")
      navigate("/RateArtist")
    }
  }

///Finalising Payment

  const payPayment = async () => {
    const payment = await EscrowContractAgent.payment() * 4/5
    console.log(payment)
    try{
      const approval = await MockDai.approve(escrowAddressAgent, utils.parseEther(payment.toString()) )
      await approval.wait()
    }catch(error){
      console.log(error)
    }finally{
      finalisePayment()
    }
  }

  const finalisePayment = async () =>{
    navigate("/Loading")
    try{
      const pay = await EscrowContractAgent.finalisePayment()
      await pay.wait()
    }catch(error){
      console.log(error)
    }finally{
      console.log("payment complete")
      setUserIsAgent(true)
      setEscrowAddressAgent(currentAddress)
      navigate("/EscrowMain")
    }
  }

///Confirming the Payment

  const confirmPayment = async () => {
    navigate("/Loading")
    try{
      const confirm = await EscrowContractArtist.confirmPayment()
      await confirm.wait()
    }catch(error){
      console.log(error)
    }finally{
      console.log("payment confirmed")
      navigate("/EscrowMain")
    }
  }

///Completing the Booking - Escrow contract destoryed and payment transferred to the Artist Profile Contract
  
const completeBooking = async () => {
    
    navigate("/Loading")
    try{
      const complete = await EscrowContractArtist.completeBooking()
      await complete.wait()
    }catch(error){
      console.log(error)
    }finally{
      console.log("Escrow Completed")
      navigate("/EscrowComplete")
    }
  }

  const rating = async () => {
    const rating = await ArtistFactoryContract.ratingArtistUp(artistAddress)
    return rating.toNumber()
  }

  console.log(rating())



  useEffect(() => {
    if(!userIsAgent){
      getEscrowAddressArtist()
    }  
  },[])

  useEffect(() => {
    getArtistName(currentContract)
    getArtistAddress(currentContract)
    getBookingAgentName(currentContract)
    getCurrentState(currentContract)
    getPayment(currentContract)
    getDeposit()
    getVenue(currentContract)
    getDate(currentContract)
    getBalance()
    getCurrentUser()
  }, [currentAddress])




  return (
    <div
    style={{height: "100%"}}
    >
      {isUserArtist
      ?
      <ArtistHeader/>
      
      :
      <BookingHeader/>

      }
      
      {isHovering && isUserArtist
      ?
      <ArtistInfo/>
      :
      <></>
      }
      
      <br></br>
      <motion.div 
      className='EscrowMain'
      initial= {{opacity: 0}}
      animate= {{opacity: 1}}
      exit= {{opacity: 0}}
      >

        <div>
          <h1 
          className='HeaderText'
          style={{fontSize: "60px"}}
          >ESCROW
          </h1>
          <br></br>
          <div
          style={{display: "flex", justifyContent: "center", gap: "10%"}}
          >
            <h3 
            className='Text'
            style={{fontSize: "18px", marginTop: "1%", marginBottom: "0.75%"}}
            >Viewing as: {currentUser}
            </h3>
            <h3 
            className='Text'
            style={{fontSize: "18px", marginTop: "1%", marginBottom: "0.75%"}}
            >Escrow Balance: ${balance.toString()}
            </h3>
          </div>
          <br></br>
        </div>
        <div className='EscrowDetails'>
          <div
          style={{width: "100%", display: "flex", gap: "5%", justifyContent: "space-between"}}
          >
            <h3 className='Text' style={{width: "30%", marginTop: "1.5%", marginBottom: "1.5%", fontSize: "18px", textAlign: "left"}}>Booking Number: {bookingNumberArtist}</h3>
            <h3 className='Text' style={{width: "30%", marginTop: "1.5%", marginBottom: "1.5%", fontSize: "18px"}}>Artist : {artistName}</h3>
            <h3 className='Text' style={{width: "30%", marginTop: "1.5%", marginBottom: "1.5%", fontSize: "18px", textAlign: "right"}}>Booking Agent: {bookingAgentName}</h3>
          </div>
          <div
          style={{width: "100%", display: "flex", gap: "5%", justifyContent: "space-between"}}
          >
            <h3 className='Text' style={{width: "30%", marginTop: "1.5%", marginBottom: "1.5%", fontSize: "18px", textAlign: "left"}}>Venue: {venue}</h3>
            <h3 className='Text' style={{width: "30%", marginTop: "1.5%", marginBottom: "1.5%", fontSize: "18px"}}>Payment: ${payment}</h3>
            <h3 className='Text' style={{width: "30%", marginTop: "1.5%", marginBottom: "1.5%", fontSize: "18px", textAlign: "right"}}>Date: {date}</h3>      
          </div>
        </div>
        <div
        className= "EscrowMainDiv"
        >
          <h3 className='Text' style={{width: "30%", color: "grey", fontSize: "20px"}}> Step 1:</h3>
          <h3 className='Text' style={{width: "80%", fontSize: "18px"}}>{bookingAgentName} to pay deposit of ${deposit}</h3>

          {(escrowState > 0)
          ?
          <h3 className='Text' style= {{width: "30%", fontSize: "18px", textAlign: "center"}}>Completed</h3>
          :
          <button 
          className='Submit'
          style={{width: "30%"}}
          onClick={payDeposit}
          >Pay
          </button>
          }
          

        </div>
        {(escrowState >= 1)
        ?
          <div
          className= "EscrowMainDiv"
          >
            <h3 className='Text' style={{width: "30%", color: "grey", fontSize: "20px"}}> Step 2:</h3>
            <h3 className='Text' style={{width: "80%", fontSize: "18px"}}>{artistName} to confirm performance</h3>
            
            {(escrowState > 1)
            ?
            <h3 className='Text' style= {{width: "30%", fontSize: "18px", textAlign: "center"}}>Completed</h3>
            :
            <button 
            className='Submit'
            style={{width: "30%"}}
            onClick={confirmPerformanceArtist}
            >Confirm
            </button>
            }
          </div>
        :
        <></>
        }
        {(escrowState >= 2)
        ?
          <div
          className= "EscrowMainDiv"
          >
            <h3 className='Text' style={{width: "30%", color: "grey", fontSize: "20px"}}> Step 3:</h3>
            <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>{bookingAgentName} to confirm performance</h3>
            
            {(escrowState > 3)
            ?
            <h3 className='Text' style= {{width: "30%", fontSize: "18px", textAlign: "center"}}>Completed</h3>
            :
            <button 
            className='Submit'
            style={{width: "30%"}}
            onClick={confirmPerformanceAgent}
            >Confirm
            </button> 
            }
          </div>
        :
        <></>
        }
        {(escrowState >= 4)
        ?
          <div
          className= "EscrowMainDiv"
          >
            <h3 className='Text' style={{width: "30%", color: "grey", fontSize: "20px"}}> Step 4:</h3>
            <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>{bookingAgentName} to finalise payment</h3>
            
            {(escrowState > 4)
            ?
            <h3 className='Text' style= {{width: "30%", fontSize: "18px", textAlign: "center"}}>Completed</h3>
            :
            <button 
            className='Submit'
            style={{width: "30%"}}
            onClick={payPayment}
            >Confirm
            </button>
            }
          </div>
            
        :
        <></>
        }
        {(escrowState >= 5)
        ?
          <div
          className= "EscrowMainDiv"
          >
            <h3 className='Text' style={{width: "30%", color: "grey", fontSize: "20px"}}> Step 5:</h3>
            <h3 className= "Text" style={{width: "80%", fontSize: "18px"}}>{artistName} to confirm payment</h3>
            
            {(escrowState > 5)
            ?
            <h3 className='Text' style= {{width: "30%", fontSize: "18px", textAlign: "center"}}>Completed</h3>
            :
            <button 
            className='Submit'
            style={{width: "30%"}}
            onClick={confirmPayment}
            >Confirm
            </button>
            }
          </div>
        :
        <></>
        }
        <br></br>

        {(escrowState > 6)
        ?
        <button 
        className='Submit'
        style={{fontSize: "18px"}}
        onClick={completeBooking}
        >Complete Booking
        </button>
        :
        <></>
        }
      </motion.div>
    </div>
  )
}

export default EscrowMain
