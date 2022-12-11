import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import {ArtistProvider} from './Context/ArtistContext'
import {BookingProvider}from './Context/BookingContext'
import AnimatedRoutes from './AnimatedRoutes';

function App() {

  return (
    <BrowserRouter>
      <ArtistProvider>
        <BookingProvider>        
          <AnimatedRoutes/>
        </BookingProvider>
      </ArtistProvider>
    </BrowserRouter>
  );
}

export default App;

