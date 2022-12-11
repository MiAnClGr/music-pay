import React, {useState, FC, ReactElement} from 'react'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract, signer} from "../../Contracts/ContractObjects"
import {motion} from 'framer-motion'



const Login : FC = () : ReactElement => {

    const [inputArtistName, setInputArtistName] = useState("")

    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
    }  

    const handleSubmitLogIn = async () => {
        const address = await ArtistFactoryContract.artistNameToAddress(inputArtistName)
        const user = await signer.getAddress()
        if(await ArtistFactoryContract.doesArtistExist(inputArtistName) == false){
            navigate("/ProfileDoesNotExist")
        }else if(await ArtistFactoryContract.ownerToArtist(user) == address){
            navigate("/ArtistProfile")
        }else{
            navigate("/NotOwner")
        }             
    }

  return (
    <motion.div
    style={{textAlign: "center", height: "100%"}} 
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    >
        <div
        className= 'CreateArtist'
        >
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

        
    </motion.div>
  )
}

export default Login
