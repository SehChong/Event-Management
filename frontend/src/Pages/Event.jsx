import React from 'react'
import { Footer } from '../Components/Footer'
import { EventProposal } from '../Components/EventProposal'
import { Header_V2 } from '../Components/Header_V2'

export const Event = () => {
  return (
    <div>
        <Header_V2/>
        <EventProposal/>
        <Footer/>
    </div>
  )
}
