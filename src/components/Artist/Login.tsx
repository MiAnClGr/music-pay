import React, {useState, FC, ReactElement} from 'react'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract, signer} from "../../Contracts/ContractObjects"



const Login : FC = () : ReactElement => {

    const [inputArtistName, setInputArtistName] = useState("")

    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
    }  

    const handleSubmitLogIn = async () => {
        navigate("/Loading")
        try{
            const transaction = await ArtistFactoryContract.createArtist(inputArtistName)
            await transaction.wait()
        }catch(e){
            navigate("/NotOwner")
        }finally{
            navigate("/ArtistProfile")
        }   
    }

  return (
    <div className= 'CreateArtist'>

        <h3 className= "HeaderText">Login</h3>
        <input
        className= 'Inputs'
        placeholder= 'Artist Name' 
        onChange= {handleChange}
        >
        </input> 
        <button 
        className= 'Submit' 
        onClick= {handleSubmitLogIn}
        >
        Log In
        </button>
        
    </div>
  )
}

export default Login
