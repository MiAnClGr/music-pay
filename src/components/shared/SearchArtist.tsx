import React, {useState, FC} from 'react'
import { useNavigate } from 'react-router'
import { ArtistFactoryContract } from '../../Contracts/ContractObjects'

type props = {
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
}

const SearchArtist : FC<props> = ({setArtistAddress}) => {

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
    <input 
    className='SearchBar'
    placeholder='Artist'
    onChange={search}
    onKeyDown={submitSearch}
    >
    </input>
  )
}

export default SearchArtist
