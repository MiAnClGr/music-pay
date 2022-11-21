import React, {useState, FC} from 'react'
import { Contract } from 'ethers'
import {useNavigate} from 'react-router-dom'

type props = {
    artistName : string
    artistProfileAddress : string
    ArtistFactoryContract : Contract
    artistLoggedIn : boolean
    setArtistLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}

const CreateNew : FC<props> = ({ArtistFactoryContract}) => {

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
            
            navigate("/Profile")
        }    
    }

  return (
    <div className= 'CreateArtist'>
        <h3 className= "HeaderText">New Artist</h3>      
        <input
        className= 'Inputs'
        placeholder= 'Artist Name' 
        onChange= {handleChange}
        >
        </input> 
        <button 
        className= 'Submit' 
        onClick= {handleSubmitCreate}
        >
        Create
        </button>
    </div>
  )
}

export default CreateNew