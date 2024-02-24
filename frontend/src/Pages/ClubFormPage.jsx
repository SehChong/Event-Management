import React from 'react'
import { Back } from '../Components/Back'
import { ClubForm } from '../Components/ClubForm'

export const ClubFormPage = () => {
  return (
    <div>
        <Back to="/Club"/>
        <ClubForm/>    
    </div>
  )
}
