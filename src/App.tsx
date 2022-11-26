import React, {useState} from 'react';
import './App.css';
import { Contract } from 'ethers';
import Login from './components/Artist/Login';
import CreateNew from './components/Artist/CreateNew';
import ArtistMain from './components/Artist/ArtistMain';
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/Artist/ArtistProfile'
import BookingMain from './components/Booking/BookingMain';
import ArtistBooking from './components/Booking/ArtistBooking';
import Loading from './components/LoadingAndError/Loading';
import NotOwner from './components/LoadingAndError/NotOwner';
import RoutingUser from './components/RoutingUser';
import {ArtistFactoryContract, provider} from "./Contracts/ContractObjects"
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'

function App() {

  const [notConnected, setNotConnected] = useState(true)
  const [artistAddress, setArtistAddress] = useState(localStorage.getItem("artistAddress") || "")
  const [artistName, setArtistName] = useState(localStorage.getItem("artistName") || "")
  const [artistProfileAddress, setArtistProfileAddress] = useState(localStorage.getItem("artistProfileAddress") || "")
  const [artistProfileContract, setArtistProfileContract] = useState<Contract>()
  const [artistLoggedIn, setArtistLoggedIn] = useState(false)


  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element = {

          <TitlePage
          provider = {provider}
          notConnected = {notConnected}
          setNotConnected = {setNotConnected}
          />
        }/>

        <Route path= "/RoutingUser" element = {
          
          <RoutingUser/>
        }/>

        <Route path= "/ArtistMain" element = {

          <ArtistMain
          artistName= {artistName}
          artistProfileAddress= {artistProfileAddress}
          artistProfileContract= {artistProfileContract}
          artistLoggedIn= {artistLoggedIn}
          />
        }/>

        <Route path= "/Login" element = {

          <Login
          artistName= {artistName}
          artistProfileAddress= {artistProfileAddress}
          ArtistFactoryContract = {ArtistFactoryContract}
          artistLoggedIn= {artistLoggedIn}
          setArtistLoggedIn= {setArtistLoggedIn}
          />
        }/>

        <Route path= "/CreateNew" element = {

          <CreateNew
          artistName= {artistName}
          artistProfileAddress= {artistProfileAddress}
          ArtistFactoryContract = {ArtistFactoryContract}
          artistLoggedIn= {artistLoggedIn}
          setArtistLoggedIn= {setArtistLoggedIn}
          />
        }/>

        <Route path= "/Profile" element = {
          
          <ArtistProfile
          artistName= {artistName}
          artistAddress= {artistAddress}
          artistProfileAddress= {artistProfileAddress}
          artistProfileContract= {artistProfileContract}
          artistLoggedIn= {artistLoggedIn}
          setArtistLoggedIn= {setArtistLoggedIn}
          setArtistName= {setArtistName}
          setArtistAddress= {setArtistAddress}
          setArtistProfileAddress= {setArtistProfileAddress}
          setArtistProfileContract= {setArtistProfileContract}

          />
        }/>

        <Route path= "/BookingMain" element = {

        <BookingMain
          setArtistAddress={setArtistAddress}
        />
        }/>

        <Route path = "/ArtistBooking" element = {

          <ArtistBooking 
          artistAddress = {artistAddress} 
          setArtistAddress= {setArtistAddress}
          />

        }/>


        <Route path = "/Loading" element = {

          <Loading/>

        }/>

        <Route path = "/NotOwner" element = {

          <NotOwner/>

        }/>
  

      </Routes>
    </BrowserRouter>
  );
}

export default App;
