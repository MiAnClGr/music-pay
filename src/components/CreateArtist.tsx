import React, {useState} from 'react'
import {ethers} from 'ethers'
// import abi from './contractABIs/ArtistFactory.json'

declare var window: any

const CreateArtist = () => {

const contractABI = ''
    
const contractAddress =     
        '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

const provider = 
        new ethers.providers.Web3Provider(window.ethereum)

const signer = provider.getSigner()   


// const createArtist = 
//       new ethers.Contract(contractAddress, contractABI, signer);



    const [artistName, setArtistName] = useState('')


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setArtistName(e.target.value)
    }  

    console.log(artistName)

    const handleSubmit = () => {

    }


    return (
        
        <div className= 'CreateArtist'>
            <input
            className= 'Inputs'
            placeholder= 'Artist Name' 
            onChange= {handleChange}
            name= 'contractName'
            >
            </input> 
            <button 
            className= 'Submit' 
            onClick= {handleSubmit}
            >
             Create
            </button>
        </div>
    )
}




export default CreateArtist