import React, {FC, ReactElement, useContext} from 'react'
import BookingContext from '../../Context/BookingContext'
import EscrowContext from '../../Context/EscrowContext'
import { useNavigate } from 'react-router'


const RateArtist = () => {

    const navigate = useNavigate()

    /// access context variables and functions
    const {createEscrowInstanceAgent} = useContext(BookingContext)
    const {artistName} = useContext(EscrowContext)

    /// create instance of Escrow contract
    const EscrowContractAgent = createEscrowInstanceAgent()

/// User Actions    
    
    /// rates the artist up
    const rateUp = async () => {
        try{
            const rate = await EscrowContractAgent.rateArtist(0)
            await rate.wait
        }catch(error){
            console.log(error)
        }finally{
            navigate('/EscrowMain')
        }
    }

    /// rates the artist down
    const rateDown = async () => {
        try{
            const rate = await EscrowContractAgent.rateArtist(1)
            await rate.wait
        }catch(error){
            console.log(error)
        }finally{
            navigate('/EscrowMain')
        }
    }


  return (
    <div
    className='Rating'
    >
        <h3 
        className='Text'
        style={{fontSize: "25px"}}
        >How would you rate your experience with {artistName}?</h3>
        <button 
        className='Submit'
        style={{width: "20%", cursor: "pointer"}}
        onClick={rateUp}
        >Good
        </button>
        <br></br>
        <button 
        className='Submit'
        style={{width: "20%", cursor: "pointer"}}
        onClick={rateDown}
        >Bad
        </button>

    </div>
  )
}

export default RateArtist