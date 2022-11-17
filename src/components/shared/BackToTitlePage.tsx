import React from 'react'
import {useNavigate} from 'react-router-dom'

const BackToTitlePage = () => {

    
const navigate = useNavigate()

    const handleSubmit = () => {
        navigate("/RoutingUser")
    }

  return (

    <div className='HomeButton'>
        <button 
        onClick= {handleSubmit}
        >
            Home
        </button>
    </div>
    
      
   
  )
}

export default BackToTitlePage
