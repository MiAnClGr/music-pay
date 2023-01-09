import React, {useState, FC, ReactElement} from 'react'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract, signer} from "../../Contracts/ContractObjects"
import {motion} from 'framer-motion'
import Home from '../shared/Home'



const Login : FC = () : ReactElement => {

    const [inputArtistName, setInputArtistName] = useState("")

    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
    }  

    const handleKeyDownLogIn = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){

            const address = await ArtistFactoryContract.artistNameToAddress(inputArtistName)
            const user = await signer.getAddress()
            if(await ArtistFactoryContract.doesArtistExist(inputArtistName) === false){
                navigate("/ProfileDoesNotExist")
            }else if(await ArtistFactoryContract.ownerToArtist(user) === address){
                navigate("/ArtistProfile")
            }else{
                navigate("/NotOwner")
            }             
        }
    }

    const handleSubmitLogIn = async () => {
        const address = await ArtistFactoryContract.artistNameToAddress(inputArtistName)
            const user = await signer.getAddress()
            if(await ArtistFactoryContract.doesArtistExist(inputArtistName) === false){
                navigate("/ProfileDoesNotExist")
            }else if(await ArtistFactoryContract.ownerToArtist(user) === address){
                navigate("/ArtistProfile")
            }else{
                navigate("/NotOwner")
            }  
    }

  return (
    <div
    style={{height: "100%"}}
    >
        <div
        style={{height: "80px", display: "flex", alignItems: "center"}}
        >
            <Home/>
        </div>
        <motion.div
        className= 'CreateOrLogInArtist'
        style={{textAlign: "center", height: "100%"}} 
        initial= {{opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}}
        >
            <h3 
            className= "Text"
            style={{fontSize: "40px", marginTop: "50%", marginBottom: "0"}}
            >Log in to Music-Pay</h3>
            <input
            className= 'Input'
            style={{
                width: "70%",
                borderBottom: "solid",
                borderWidth: "1px",
                borderColor: "grey"
            }} 
            placeholder= 'Artist Name' 
            onChange= {handleChange}
            onKeyDown= {handleKeyDownLogIn}
            />
            
            <button 
            className= 'Submit'
            style={{width: "91%"}}
            onClick= {handleSubmitLogIn}
            >
            LOG IN
            </button>
        </motion.div>

        
    </div>
  )
}

export default Login
