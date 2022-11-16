import React, {FC, useState} from 'react'
import {Contract} from 'ethers'
import {useNavigate} from 'react-router-dom'


type props = {
    ArtistFactoryContract : Contract
}

const CreateArtist : FC<props> = ({ArtistFactoryContract}) => {

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

    const handleSubmitLogIn = async () => {
        navigate("/Loading")
        try{
            const transaction = await ArtistFactoryContract.createArtist(inputArtistName)
            await transaction.wait()

            navigate("/Profile")
        }catch(e){
            navigate("/NotOwner")
        }   
    }

    return (
       
        <>
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
                <br></br>
                <br></br>
                <br></br>
                <h3 className= "HeaderText">Existing Artist</h3>
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
        </>

       
        
    )
}




export default CreateArtist



///TO FIX 

///profile gets created and the profile address is passed to ArtistProfile and then artist name is retreived from ArtistProfile
///contract to be displayed in artist profile but Routes need to be in the same place 
/// need to figure out routes better
///