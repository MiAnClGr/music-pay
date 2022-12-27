import React, {createContext, useState, ReactNode} from 'react'
import {Contract} from 'ethers'

interface EscrowContextInterface {
artistName : string
getArtistName :  (EscrowContract: Contract) => Promise<void>
bookingAgentName : string
getBookingAgentName : (EscrowContract: Contract) => Promise<void>
escrowState : number
getCurrentState : (EscrowContract: Contract) => Promise<void>
userIsAgent : Boolean
setUserIsAgent : React.Dispatch<React.SetStateAction<boolean>>
getArtistAddress : (EscrowContract: Contract) => Promise<void>
payment : number | undefined
getPayment : (EscrowContract: Contract) => Promise<void>


}

const EscrowContext = createContext<EscrowContextInterface>({} as EscrowContextInterface)

export const EscrowProvider  = ({children} : {children : ReactNode}) => {

  
  const [escrowState, setEscrowState] = useState<number>(0)

///Fetch artist name from selected Escrow

  const [artistName, setArtistName] = useState("")

  const getArtistName = async (EscrowContract : Contract) => {
    const name = await EscrowContract.artistName()
    console.log(name)
    setArtistName(name)
  }

///Fetch booking agent name from selected Escrow

  const [bookingAgentName, setBookingAgentName] = useState("")

  const getBookingAgentName = async (EscrowContract : Contract) => {
    const bookingAgentName = await EscrowContract.bookingAgentName()
    setBookingAgentName(bookingAgentName)
  }

///Fetch artist address from selected Escrow

  const [artistAddress, setArtistAddress] = React.useState("")

  const getArtistAddress = async (EscrowContract : Contract) => {
    const artistAddress = await EscrowContract.artist()
    setArtistAddress(artistAddress)
  }

///Fetch payment from selected Escrow

  const [payment, setPayment] = React.useState<number>()

  const getPayment = async (EscrowContract : Contract) => {
    const payment = await EscrowContract.payment()
    setPayment(payment.toNumber())
  }

///Fetches the current escrow state

  const getCurrentState = async (EscrowContract : Contract) => {
    const state = await EscrowContract.currentState()
    setEscrowState(state)
  }

  const [userIsAgent, setUserIsAgent] = useState(false)

  return(
    <EscrowContext.Provider
    value={{
      artistName,
      getArtistName,
      bookingAgentName,
      getBookingAgentName,
      escrowState,
      getCurrentState,
      userIsAgent,
      setUserIsAgent,
      getArtistAddress,
      payment,
      getPayment

      }}
      >
        {children}
    </EscrowContext.Provider>
  ) 
}

export default EscrowContext