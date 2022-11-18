import React, {useState} from 'react';
import './App.css';
import CreateArtist from './components/Artist/CreateArtist'
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/Artist/ArtistProfile'
import SearchArtist from './components/Booking/SearchArtist';
import ArtistBooking from './components/Booking/ArtistBooking';
import Loading from './components/LoadingAndError/Loading';
import NotOwner from './components/LoadingAndError/NotOwner';
import RoutingUser from './components/RoutingUser';
import {ArtistFactoryContract, provider} from "./Contracts/ContractObjects"
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'

function App() {

  const [notConnected, setNotConnected] = useState(true)
  const [artistAddress, setArtistAddress] = useState(localStorage.getItem("artistAddress") || "")
  
 

  return (
    <HashRouter>
      <Routes>

        <>
          
          <Route path= "/Music-Pay" element = {

            <TitlePage
            provider = {provider}
            notConnected = {notConnected}
            setNotConnected = {setNotConnected}
            />
          }/>

          <Route path= "/RoutingUser" element = {
            
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
          setArtistAddress = {setArtistAddress}
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


    </HashRouter>
  );
}

export default App;
