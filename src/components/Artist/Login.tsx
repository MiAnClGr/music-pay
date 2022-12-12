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
        if(await ArtistFactoryContract.doesArtistExist(inputArtistName) === false){
            navigate("/ProfileDoesNotExist")
        }else if(await ArtistFactoryContract.ownerToArtist(user) === address){
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
    transition={{duration: 0.2}}
    >
        <div
        className= 'CreateArtist'>
            <h2 
            className= "Text"
            style={{fontSize: "25px", marginBottom: "0"}}
            >Log into Music-Pay</h2>
            <input
            className= 'Inputs'
            style={{
                borderBottom : "solid",
                borderColor: "grey",
                borderWidth: "1px",
                borderTop: "hidden", 
                borderLeft: "hidden", 
                borderRight: "hidden",
                width: "70%"
                
            }} 
            placeholder= 'Artist Name' 
            onChange= {handleChange}
            >
            </input> 
            <button 
            className= 'Submit'
            style={{
                color: "black", 
                backgroundColor: "white", 
                width: "89%",
                height: "18%", 
                borderWidth: "1px",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "5px"
            }}
            onClick= {handleSubmitLogIn}
            >
            LOG IN
            </button>
        </div>

        
    </motion.div>
  )
}

export default Login
