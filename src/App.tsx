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
import Escrow from './components/shared/Escrow'
import Loading from './components/LoadingAndError/Loading';
import NotOwner from './components/LoadingAndError/NotOwner';
import RoutingUser from './components/RoutingUser';
import {signer} from "./Contracts/ContractObjects"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ArtistProvider} from './Context/ArtistContext'

function App() {

  const [artistConnected, setArtistConnected] = useState<boolean>(false)
  const [artistAddress, setArtistAddress] =  useState<string>("")
  const [updateClicked, setUpdateClicked] = useState<boolean>(false)
  const [updateDisplayBookings, setUpdateDisplayBookings] = useState<boolean>(false)
  const [bookingNumber, setBookingNumber] = useState<string>("")
  const [escrowAddress, setEscrowAddress] = useState<string>("")

  const displayUpdateAboutMe = () => {
      setUpdateClicked(!updateClicked)
  }

  const displayBookings = () => {
    setUpdateDisplayBookings(!updateDisplayBookings)

  }
  
  const createArtistProfileInstance = (artist : string) => {
    const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 

    return ArtistProfileContract
  }



  return (
    <ArtistProvider>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element = {

            <TitlePage/>
          }/>

          <Route path= "/RoutingUser" element = {
            
            <RoutingUser
            artistConnected= {artistConnected}
            />
          }/>

          <Route path= "/ArtistMain" element = {

            <ArtistMain
            artistAddress= {artistAddress}
            setArtistAddress= {setArtistAddress}
            displayUpdateAboutMe= {displayUpdateAboutMe}
            displayBookings= {displayBookings}
            artistConnected= {artistConnected}
            setArtistConnected= {setArtistConnected}
            createArtistProfileInstance = {createArtistProfileInstance}
            />
          }/>

          <Route path= "/Login" element = {

            <Login/>
          }/>

          <Route path= "/CreateNew" element = {

            <CreateNew/>
          }/>

          <Route path= "/Profile" element = {
            
            <ArtistProfile
            artistAddress= {artistAddress}
            setArtistAddress= {setArtistAddress}
            updateClicked= {updateClicked}
            setUpdateClicked= {setUpdateClicked}
            displayUpdateAboutMe= {displayUpdateAboutMe}
            displayBookings= {displayBookings}
            updateDisplayBookings= {updateDisplayBookings}
            setArtistConnected= {setArtistConnected}
            artistConnected= {artistConnected}
            createArtistProfileInstance= {createArtistProfileInstance}
            setBookingNumber= {setBookingNumber}
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

          <Route path = "/Escrow" element = {
            <Escrow
            bookingNumber= {bookingNumber}
            escrowAddress= {escrowAddress}
            setEscrowAddress= {setEscrowAddress}
            createArtistProfileInstance= {createArtistProfileInstance}
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
    </ArtistProvider>
  );
}

export default App;

