import React, {useState, FC} from 'react'
import {useNavigate} from 'react-router-dom'
import { ArtistFactoryContract } from '../../Contracts/ContractObjects'
import BookingHeader from "../shared/BookingHeader"

type props = {
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
}

const BookingMain : FC<props> = ({setArtistAddress}) => {

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")
    
  
    const search = (e : React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
    }
  
    const submitSearch = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){
            const address = await ArtistFactoryContract.artistByName(searchInput)
            console.log(address)      
            if(address !== "0x0000000000000000000000000000000000000000"){
                setArtistAddress(address)
                navigate("/ArtistBooking")
            }else{
                navigate("/NotOwner")
            }
        }
    }


  return (
    <>
      <BookingHeader
      search= {search}
      submitSearch= {submitSearch}
      />
      <div style= {{textAlign: 'center', marginTop: '250px'}}>
            <h3 
            className='Text'
            style= {{fontSize: '60px'}}
            >Welcome to Music-Pay for Booking Agents</h3>
        </div>
    </>
  )
}

export default BookingMain
