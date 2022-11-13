import React, {FC, useState}from 'react'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import ArtistBooking from './ArtistBooking'
import {ArtistFactoryContract}from "../ContractObjects"

type props = {
  setArtistName : React.Dispatch<React.SetStateAction<string>>
}

const SearchArtist : FC<props> = ({setArtistName}) => {

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")
    

    const search = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const submitSearch = async () => {
        const name = await ArtistFactoryContract.artistByName(searchInput)      
        setArtistName(name)

        navigate("/ArtistBooking")
    }

    console.log()

  return (
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
  )
}

export default SearchArtist