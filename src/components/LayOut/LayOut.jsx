import React from 'react'
import Header from '../Header/Header'
import LowerHeader from '../Header/Lowerheader'

function LayOut({ children }) {
  return (
    <div>
        <Header/>
        <LowerHeader/>
        {children}
    </div>
  )
}

export default LayOut