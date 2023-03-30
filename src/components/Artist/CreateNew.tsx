import React, {useState, useContext, FC, ReactElement} from 'react'
import ArtistContext from '../../Context/ArtistContext'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract} from "../../Contracts/ContractObjects"
import {motion} from 'framer-motion'
import LogOut from '../shared/LogOut'
import Home from '../shared/Home'

/*
 * A form for creating a new artist profile.
 */

const CreateNew : FC = () : ReactElement => {

    const navigate = useNavigate()

    /// access artistLoggedIn state variable from context
    const {artistLoggedIn} = useContext(ArtistContext)

    /// state variables
    const [inputArtistName, setInputArtistName] = useState("")

///User Actions

    /// submits the creation of a new artist to the contract
    const handleSubmitCreate = async () => {
        navigate("/Loading")
        try{
            const transaction = await ArtistFactoryContract.createArtist(inputArtistName)
            await transaction.wait()
            
        }catch(error){
            console.log(error)
        }finally{ 
            navigate("/ArtistProfile")
        }    
    }

///Event Handlers

    /// handles the change of the name input field
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
    }  

    /// handles the keydown event of the name input field
    const handleKeyDownCreate = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){
                navigate("/Loading")
            try{
                const transaction = await ArtistFactoryContract.createArtist(inputArtistName)
                await transaction.wait()
                
            }catch(error){
                console.log(error)
            }finally{ 
                navigate("/ArtistProfile")
            }
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
            <h3 className= "Text"
            style={{fontSize: "40px", marginTop: "50%", marginBottom: "0"}}
            >Create a new profile</h3>      
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
            onKeyDown= {handleKeyDownCreate}
            />
             
            <button 
            className= 'Submit'
            style={{width: "91%"}} 
            onClick= {handleSubmitCreate}
            >
            CREATE
            </button>
        </motion.div>
        {artistLoggedIn
        ?
        <LogOut/>
        :
        <></>   
        }
    </div>
  )
}

export default CreateNew