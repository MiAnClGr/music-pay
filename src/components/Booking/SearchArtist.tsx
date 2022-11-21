import React, {FC, useState}from 'react'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract}from "../../Contracts/ContractObjects"
import BackToTitlePage from '../shared/Home'

type props = {
  setArtistAddress : React.Dispatch<React.SetStateAction<string>>
}

const SearchArtist : FC<props> = ({setArtistAddress}) => {

  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("")
  

  const search = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const submitSearch = async () => {
    const address = await ArtistFactoryContract.artistByName(searchInput)
    console.log(address)      
    if(address !== "0x0000000000000000000000000000000000000000"){
      setArtistAddress(address)
      navigate("/ArtistBooking")
    }else{
      navigate("/NotOwner")
    }
  }

  return (
    <>
      <BackToTitlePage/>
      <div className='SearchArtist'>
        <input 
        className='Inputs'
        placeholder='Search Artist'
        onChange={search}
        >
        </input>
        <button 
        className='Submit'
        onClick={submitSearch}
        >
        Search
        </button>
      </div>
    </>
  )
}

export default SearchArtist