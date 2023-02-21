import {useEffect} from 'react';
import './App.css';
import './App.mobile.css';
import {BrowserRouter} from 'react-router-dom'
import {ArtistProvider} from './Context/ArtistContext'
import {BookingProvider} from './Context/BookingContext'
import {EscrowProvider} from './Context/EscrowContext'
import AnimatedRoutes from './AnimatedRoutes';

declare var window : any 

function App() {

  useEffect(() => {
    if(window.ethereum){
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
    }
  },[])


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

