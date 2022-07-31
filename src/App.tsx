import React, {useState, useEffect} from 'react';
import './App.css';
import {ethers} from 'ethers'
import CreateArtist from './components/CreateArtist'
import TitlePage from './components/TitlePage'

declare var window: any


// const contractABI = abi.output.abi

// console.log(contractABI)
    
// const contractAddress =     
//         '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)

const signer : ethers.providers.JsonRpcSigner = provider.getSigner()


// const Contract = 
//       new ethers.Contract(contractAddress, contractABI, signer);





function App() {

  const [notConnected, setNotConnected] = useState(true)


  console.log(window.ethereum.isConnected())
  console.log(notConnected)


  return (
    <>
    { notConnected

    ?
      <TitlePage
      provider= {provider}
      notConnected= {notConnected}
      setNotConnected= {setNotConnected}
      />
    :  
      <CreateArtist/>

    }
    </>
  );
}

export default App;
