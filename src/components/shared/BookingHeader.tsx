import React, {FC, useState, ReactElement} from 'react'
import { Link } from 'react-router-dom'
import Home from "./Home"

type props = {
    search : (e: React.ChangeEvent<HTMLInputElement>) => void
    submitSearch : (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>
}

const ArtistHeader : FC<props> = ({search, submitSearch}) : ReactElement => {

    const [searchClicked, setSearchClicked] = useState(false)
  
  return(
    
    <header className='Header'>
      <Home/>
      <Link
      className='About' 
      to= "/Login"
      >
      About
      </Link>
      <h3
      className='Search'
      onClick= {() => setSearchClicked(!searchClicked)}
      >
      Search
      </h3>
      {searchClicked 
        ? 
      <input 
      className='SearchBar'
      placeholder='Artist Name'
      onChange={search}
      onKeyDown={submitSearch}
      >
      </input>
        :
        <></>
      }
    </header>
  )
}

export default ArtistHeader