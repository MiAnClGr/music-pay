import React, {FC, ReactElement, useContext} from 'react'
import ArtistContext from '../../Context/ArtistContext'
import EscrowContext from '../../Context/EscrowContext'


const RateAgent : FC = () : ReactElement => {

    /// access context state variables and functions
    const {createEscrowInstanceArtist} = useContext(ArtistContext)
    const {bookingAgentName} = useContext(EscrowContext)

    /// create instance of escrow contract
    const EscrowContractArtist = createEscrowInstanceArtist()

    /// rate agent up
    const rateUp = async () => {
        await EscrowContractArtist.rateAgent(0)
    }

    /// rate agent down
    const rateDown = async () => {
        await EscrowContractArtist.rateAgent(1)
    }

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
