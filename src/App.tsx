import React, {useState, useEffect} from 'react';
import './App.css';
import {ethers, Contract} from 'ethers'
import CreateArtist from './components/CreateArtist'
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/ArtistProfile'
import {ArtistFactoryContract, provider} from "./ContractObjects"
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'

declare var window: any

type Connected = {
  ArtistFactoryContract : Contract
  setArtistName : React.Dispatch<React.SetStateAction<string>>
  setArtistAddress : React.Dispatch<React.SetStateAction<string>>
  artistName : string
}

function App() {

  const [notConnected, setNotConnected] = useState(true)


  // console.log(window.ethereum.isConnected())
  console.log(notConnected)


  return (
    <Router>
      <Routes>

        <>
          <Route path= "/CreateArtist" element = {

            <CreateArtist
            ArtistFactoryContract = {ArtistFactoryContract}
            />
          }/>

        

          <Route path= "/Profile" element = {
            <ArtistProfile
      
            />
          }/>
        </>

      </Routes>


    </Router>
  );
}

export default App;
