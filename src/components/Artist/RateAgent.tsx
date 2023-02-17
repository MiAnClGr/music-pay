import React, {FC, ReactElement, useContext} from 'react'
import { ArtistFactoryContract } from '../../Contracts/ContractObjects'
import ArtistContext from '../../Context/ArtistContext'
import EscrowContext from '../../Context/EscrowContext'


const RateAgent : FC = () : ReactElement => {

    const {createEscrowInstanceArtist} = useContext(ArtistContext)

    const {bookingAgentName} = useContext(EscrowContext)

    const EscrowContractArtist = createEscrowInstanceArtist()

    const rateUp = async () => {
        await EscrowContractArtist.rateAgent(0)
    }

    const rateDown = async () => {
        await EscrowContractArtist.rateAgent(1)
    }

    console.log(ArtistFactoryContract.ratingAgentUp())

  return (
    <div>
        <h3 className='Text'>Please take the time to rate {bookingAgentName}</h3>
        <button 
        className='Submit'
        onClick={rateUp}
        >Rate Up</button>
        <button 
        className='Submit'
        onClick={rateDown}
        >Rate Down</button>
      
    </div>
  )
}

export default RateAgent
