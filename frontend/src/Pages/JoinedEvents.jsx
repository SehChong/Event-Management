import React from 'react'
import { RegisteredEvents } from '../Components/RegisteredEvents'
import { Footer } from '../Components/Footer'
import { Header_V2 } from '../Components/Header_V2'

export const JoinedEvents = () => {
  return (
    <div>
        <Header_V2 />
        <RegisteredEvents />
        <Footer/>
    </div>
  )
}
