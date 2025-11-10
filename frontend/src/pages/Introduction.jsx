import React from 'react'
import LandingPage from '../components/LandingPage'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'
import Working from '../components/working'
const Introduction = () => {
  return (
    <div className=''>
      <LandingPage/>
      <Working/>
      <Feedback/>
      <Footer/>
    </div>
  )
}

export default Introduction