import React, {useState, FC, ReactElement} from 'react'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract} from "../../Contracts/ContractObjects"
import {motion} from 'framer-motion'


const CreateNew : FC = () : ReactElement => {

    const [inputArtistName, setInputArtistName] = useState("")

    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
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
    <motion.div
    style={{textAlign: "center", height: "100%"}} 
    initial= {{opacity: 0}}
    animate= {{opacity: 1}}
    exit= {{opacity: 0}}
    transition={{duration: 0.2}}
    >
        <div className= 'CreateArtist'>
            <h3 className= "Text"
            style={{fontSize: "25px", marginBottom: "0"}}
            >Create a new profile</h3>      
            <input
            className= 'Inputs'
            style={{width: "70%"}} 
            placeholder= 'Artist Name' 
            onChange= {handleChange}
            >
            </input> 
            <button 
            className= 'Submit'
            style={{width: "91%"}} 
            onClick= {handleSubmitCreate}
            >
            CREATE
            </button>
        </div>
    </motion.div>
  )
}

export default CreateNew