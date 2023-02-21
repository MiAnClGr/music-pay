import {useEffect} from 'react'
import { Link } from 'react-router-dom'

const SwitchNetwork = () => {

    useEffect(() => {

    })

  return (
    <div 
    className='LoadingScreen'
    style={{marginTop: "18%"}}
    >
      <h1 className='HeaderText' style={{fontSize: "40px"}}>Please switch to the Mumbai Network</h1>
      <br></br>
      <h1 className='HeaderText'>Network Name: Mumbai Testnet</h1>
      <h1 className='HeaderText'>RPC URL: https://rpc-mumbai.maticvigil.com/</h1>
      <h1 className='HeaderText'>Chain Id: 80001</h1>
      <h1 className='HeaderText'>Currency Symbol: MATIC</h1>
      
      <br></br>
      <br></br>
      <Link
      to={"/"}
      className= 'Link'
      >
      Back
      </Link>

    </div>
  )
}

export default SwitchNetwork
