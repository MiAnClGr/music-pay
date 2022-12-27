import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import {ArtistProvider} from './Context/ArtistContext'
import {BookingProvider} from './Context/BookingContext'
import {EscrowProvider} from './Context/EscrowContext'
import AnimatedRoutes from './AnimatedRoutes';

function App() {

  return (
    <BrowserRouter>
      <EscrowProvider>
        <ArtistProvider>
          <BookingProvider>        
            <AnimatedRoutes/>
          </BookingProvider>
        </ArtistProvider>
      </EscrowProvider>
    </BrowserRouter>
  );
}

export default App;

