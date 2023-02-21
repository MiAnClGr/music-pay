import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion';
import Login from './components/Artist/Login';
import CreateNew from './components/Artist/CreateNew';
import ArtistMain from './components/Artist/ArtistMain';
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/Artist/ArtistProfile'
import BookingMain from './components/Booking/BookingMain';
import ArtistPage from './components/Booking/ArtistPage';
import ArtistBooking from './components/Booking/ArtistBooking';
import BookingComplete from './components/Booking/BookingComplete';
import EscrowMain from './components/shared/EscrowMain'
import EscrowComplete from './components/shared/EscrowComplete';
import Loading from './components/LoadingAndError/Loading';
import NotOwner from './components/LoadingAndError/NotOwner';
import ProfileDoesNotExist from './components/LoadingAndError/ProfileDoesNotExist';
import ArtistDoesNotExist from './components/LoadingAndError/ArtistDoesNotExist';
import RoutingUser from './components/RoutingUser';
import About from './components/shared/About';
import BookingsList from './components/Artist/BookingsList';
import MetamaskNotDetected from './components/LoadingAndError/MetamaskNotDetected';
import SwitchNetwork from './components/LoadingAndError/SwitchNetwork';
import EscrowList from './components/Booking/EscrowList';
import RateAgent from './components/Artist/RateAgent';
import RateArtist from './components/Booking/RateArtist';

const AnimatedRoutes = () => {

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>

        <Route path= "/" element = {<TitlePage/>}/>

        <Route path= "/RoutingUser" element = {<RoutingUser/>}/>

        <Route path= "/ArtistMain" element = {<ArtistMain/>}/>

        <Route path= "/Login" element = {<Login/>}/>

        <Route path= "/CreateNew" element = {<CreateNew/>}/>

        <Route path= "/ArtistProfile" element = {<ArtistProfile/>}/>

        <Route path= "/BookingMain" element = {<BookingMain/>}/>

        <Route path= "/Artist" element = {<ArtistPage/>}/>

        <Route path= "/About" element = {<About/>}/>

        <Route path = "/ArtistBooking" element = {<ArtistBooking/>}/>

        <Route path = "/BookingComplete" element = {<BookingComplete/>}/>

        <Route path = "/BookingsList" element = {<BookingsList/>}/>

        <Route path = "/EscrowMain" element = {<EscrowMain/>}/>

        <Route path = "/RateArtist" element = {<RateArtist/>}/>

        <Route path = "/RateAgent" element = {<RateAgent/>}/>

        <Route path = "/EscrowComplete" element = {<EscrowComplete/>}/>

        <Route path = "/EscrowList" element = {<EscrowList/>}/>

        <Route path = "/Loading" element = {<Loading/>}/>

        <Route path = "/NotOwner" element = {<NotOwner/>}/>

        <Route path = "/ProfileDoesNotExist" element = {<ProfileDoesNotExist/>}/>

        <Route path = "/ArtistDoesNotExist" element = {<ArtistDoesNotExist/>}/>

        <Route path = "/MetamaskNotDetected" element = {<MetamaskNotDetected/>}/>

        <Route path = "/SwitchNetwork" element = {<SwitchNetwork/>}/>
        
      </Routes>  
    </AnimatePresence>
  )
}

export default AnimatedRoutes