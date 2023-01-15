import React, { ReactElement } from 'react'

const Loading = () : ReactElement => {
  return (
    <div 
    className= "LoadingScreen"
    style={{marginTop: "18%"}}
    >
      <h1 className='Loading'>Loading</h1>
    </div>
  )
}

export default Loading
