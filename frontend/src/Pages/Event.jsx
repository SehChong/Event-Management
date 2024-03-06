import React from 'react'
import { Footer } from '../Components/Footer'
import { EventProposal } from '../Components/EventProposal'
import { Header_V2 } from '../Components/Header_V2'

export const Event = () => {
  const handleFilterChange = (value) => {
    console.log('Filter changed:', value);
  };
  
  return (
    <div>
        <Header_V2/>
        <EventProposal onFilterChange={handleFilterChange} />
        <Footer/>
    </div>
  )
}
