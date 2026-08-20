import React from 'react'
import MainBanner from '../Components/MainBanner'
import Cateogries from '../Components/Cateogries'
import BestSeller from '../Components/BestSeller'
import BottomBanner from '../Components/BottomBanner'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10 '>
    <MainBanner />
    <Cateogries />
    <BestSeller />
    <BottomBanner />
    <NewsLetter />
      
    </div>
  )
}

export default Home
