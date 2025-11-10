import React from 'react'
import LandingPage from '../components/LandingPage'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'
import Explaination from '../components/Explaination'
const Introduction = () => {
  return (
    <div className=''>
      <LandingPage/>
      <Explaination/>
      <Feedback/>
      <Footer/>
    </div>
  )
}

export default Introduction