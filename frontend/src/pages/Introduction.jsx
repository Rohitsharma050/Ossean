import React from 'react'
import LandingPage from '../components/LandingPage'
import Working from '../components/working'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'
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