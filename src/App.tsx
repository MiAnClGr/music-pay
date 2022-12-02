import React, {useState} from 'react';
import './App.css';
import { ethers, Contract } from 'ethers';
import Login from './components/Artist/Login';
import CreateNew from './components/Artist/CreateNew';
import ArtistMain from './components/Artist/ArtistMain';
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/Artist/ArtistProfile'
import ArtistProfileABI from './ABI/ArtistProfile'
import BookingMain from './components/Booking/BookingMain';
import ArtistBooking from './components/Booking/ArtistBooking';
import Loading from './components/LoadingAndError/Loading';
import NotOwner from './components/LoadingAndError/NotOwner';
import RoutingUser from './components/RoutingUser';
import {ArtistFactoryContract, signer} from "./Contracts/ContractObjects"
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'

function App() {

  const [artistConnected, setArtistConnected] = useState(false)
  const [artistAddress, setArtistAddress] =  useState("")
  const [artistName, setArtistName] = useState(localStorage.getItem("artistName") || "")
  const [artistProfileAddress, setArtistProfileAddress] = useState(localStorage.getItem("artistProfileAddress") || "")
  const [artistLoggedIn, setArtistLoggedIn] = useState(false)
  const [clicked, setClicked] = useState(false)

  const openInput = () => {
      setClicked(!clicked)
  }
  
  const createInstance = (artist : string) => {
    const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 

    return ArtistProfileContract
  }



  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element = {

          <TitlePage/>
        }/>

        <Route path= "/RoutingUser" element = {
          
          <RoutingUser
          artistLoggedIn= {artistLoggedIn}
          artistConnected= {artistConnected}
          />
        }/>

        <Route path= "/ArtistMain" element = {

          <ArtistMain
          artistName= {artistName}
          artistAddress= {artistAddress}
          setArtistAddress= {setArtistAddress}
          artistProfileAddress= {artistProfileAddress}
          artistLoggedIn= {artistLoggedIn}
          setArtistLoggedIn= {setArtistLoggedIn}
          openInput= {openInput}
          artistConnected= {artistConnected}
          setArtistConnected= {setArtistConnected}
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
          artistLoggedIn= {artistLoggedIn}
          setArtistLoggedIn= {setArtistLoggedIn}
          setArtistName= {setArtistName}
          setArtistAddress= {setArtistAddress}
          setArtistProfileAddress= {setArtistProfileAddress}
          clicked= {clicked}
          setClicked= {setClicked}
          openInput= {openInput}
          setArtistConnected= {setArtistConnected}
          artistConnected= {artistConnected}
          createInstance= {createInstance}

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

