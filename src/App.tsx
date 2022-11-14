import React, {useState, useEffect} from 'react';
import './App.css';
import {ethers, Contract} from 'ethers'
import CreateArtist from './components/CreateArtist'
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/ArtistProfile'
import SearchArtist from './components/SearchArtist';
import ArtistBooking from './components/ArtistBooking';
import Loading from './LoadingAndError/Loading';
import NotOwner from './LoadingAndError/NotOwner';
import RoutingUser from './components/RoutingUser';
import {ArtistFactoryContract, provider, signer} from "./ContractObjects"
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
  const [artistAddress, setArtistAddress] = useState<string>("")
  
 

  return (
    <Router>
      <Routes>

        <>
          
          <Route path= "/Music-Pay" element = {

            <TitlePage
            provider = {provider}
            notConnected = {notConnected}
            setNotConnected = {setNotConnected}
            />
          }/>

          <Route path= "/Routing User" element = {
            
            <RoutingUser/>
          }/>


          <Route path= "/Profile" element = {
            
            <ArtistProfile/>
          }/>

          <Route path= "/CreateArtist" element = {

            <CreateArtist
            ArtistFactoryContract = {ArtistFactoryContract}/>
          }/>

          <Route path = "/SearchArtist" element = {

          <SearchArtist
          setArtistName = {setArtistAddress}
          />

          }/>

          <Route path = "/ArtistBooking" element = {

          <ArtistBooking 
          artistAddress = {artistAddress} 
          />

          }/>


          <Route path = "/Loading" element = {

            <Loading/>

          }/>

          <Route path = "/NotOwner" element = {

          <NotOwner/>

          }/>
    
        </>

      </Routes>


    </Router>
  );
}

export default App;
