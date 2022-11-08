import React, {FC, MouseEventHandler, useState} from 'react'
import {ethers, Contract} from 'ethers'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'


declare var window: any

type props = {
    ArtistFactoryContract : Contract
}

const CreateArtist : FC<props> = ({ArtistFactoryContract}) => {

 
    const [inputArtistName, setInputArtistName] = useState("")

    const navigate = useNavigate()


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)

    }  

    const handleSubmit = async () => {
        await ArtistFactoryContract.createArtist(inputArtistName)
        navigate("/Profile")
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



///TO FIX 

///profile gets created and the profile address is passed to ArtistProfile and then artist name is retreived from ArtistProfile
///contract to be displayed in artist profile but Routes need to be in the same place 
/// need to figure out routes better
///