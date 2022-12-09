import React, {useState} from 'react';
import './App.css';
import Login from './components/Artist/Login';
import CreateNew from './components/Artist/CreateNew';
import ArtistMain from './components/Artist/ArtistMain';
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/Artist/ArtistProfile'
import BookingMain from './components/Booking/BookingMain';
import ArtistBooking from './components/Booking/ArtistBooking';
import Escrow from './components/shared/Escrow'
import Loading from './components/LoadingAndError/Loading';
import NotOwner from './components/LoadingAndError/NotOwner';
import RoutingUser from './components/RoutingUser';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ArtistProvider} from './context/ArtistContext'
import {BookingProvider}from './context/BookingContext'

function App() {

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

  return (
    <BrowserRouter>
      <ArtistProvider>
        <BookingProvider>        
          <Routes>
            <Route path= "/" element = {

              <TitlePage/>
            }/>

            <Route path= "/RoutingUser" element = {
              
              <RoutingUser/>
            }/>

            <Route path= "/ArtistMain" element = {

              <ArtistMain
              displayUpdateAboutMe= {displayUpdateAboutMe}
              displayBookings= {displayBookings}
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
              updateClicked= {updateClicked}
              setUpdateClicked= {setUpdateClicked}
              displayUpdateAboutMe= {displayUpdateAboutMe}
              displayBookings= {displayBookings}
              updateDisplayBookings= {updateDisplayBookings}
              setBookingNumber= {setBookingNumber}
              />
            }/>

            <Route path= "/BookingMain" element = {

              <BookingMain/>
            }/>

            <Route path = "/ArtistBooking" element = {

              <ArtistBooking/>

            }/>

            <Route path = "/Escrow" element = {
              <Escrow
              bookingNumber= {bookingNumber}
              escrowAddress= {escrowAddress}
              setEscrowAddress= {setEscrowAddress}
              />
            }/>


            <Route path = "/Loading" element = {

              <Loading/>

            }/>

            <Route path = "/NotOwner" element = {

              <NotOwner/>

            }/>
          </Routes>      
        </BookingProvider>
      </ArtistProvider>
    </BrowserRouter>
  );
}

export default App;

