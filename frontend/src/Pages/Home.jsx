import React from 'react';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import { HomeContent } from '../Components/HomeContent';


export const Home = () => {
  return (
    <div>
      <Header/>
      <HomeContent/>
      <Footer/>
    </div>
  )
}
