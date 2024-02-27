import React from 'react'
import { Header_V2 } from '../Components/Header_V2'
import { Footer } from '../Components/Footer'
import { CardEventSlider } from '../Components/CardEventSlider'

export const EventList = () => {
  return (
    <div>
        <Header_V2/>
        <CardEventSlider/>
        <Footer/>
    </div>
  )
}
