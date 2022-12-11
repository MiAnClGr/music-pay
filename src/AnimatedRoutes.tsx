import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import Login from './components/Artist/Login';
import CreateNew from './components/Artist/CreateNew';
import ArtistMain from './components/Artist/ArtistMain';
import TitlePage from './components/TitlePage'
import ArtistProfile from './components/Artist/ArtistProfile'
import BookingMain from './components/Booking/BookingMain';
import ArtistBooking from './components/Booking/ArtistBooking';
import BookingComplete from './components/Booking/BookingComplete';
import Escrow from './components/shared/Escrow'
import Loading from './components/LoadingAndError/Loading';
import NotOwner from './components/LoadingAndError/NotOwner';
import ProfileDoesNotExist from './components/LoadingAndError/ProfileDoesNotExist';
import RoutingUser from './components/RoutingUser';

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

        <Route path = "/ArtistBooking" element = {<ArtistBooking/>}/>

        <Route path = "/BookingComplete" element = {<BookingComplete/>}/>

        <Route path = "/Escrow" element = {<Escrow/>}/>

        <Route path = "/Loading" element = {<Loading/>}/>

        <Route path = "/NotOwner" element = {<NotOwner/>}/>

        <Route path = "/ProfileDoesNotExist" element = {<ProfileDoesNotExist/>}/>
        
      </Routes>  
    </AnimatePresence>
  )
}

export default AnimatedRoutes