import React, {useState, useContext, FC, ReactElement} from 'react'
import ArtistHeader from './ArtistHeader'
import BookingHeader from '../Booking/BookingHeader'
import ArtistContext from '../../Context/ArtistContext'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract} from "../../Contracts/ContractObjects"
import {motion} from 'framer-motion'
import LogOut from '../shared/LogOut'
import Home from '../shared/Home'


const CreateNew : FC = () : ReactElement => {

    const {artistLoggedIn} = useContext(ArtistContext)

    const [inputArtistName, setInputArtistName] = useState("")

    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
    }  

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
            style={{fontSize: "35px", marginTop: "50%", marginBottom: "0"}}
            >Create a new profile</h3>      
            <input
            className= 'Input'
            style={{width: "70%"}} 
            placeholder= 'Artist Name' 
            onChange= {handleChange}
            onKeyDown= {handleKeyDownCreate}
            >
            </input> 
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