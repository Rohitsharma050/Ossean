import React, { useContext } from 'react'
import worldMap from '../assets/worldMap.png'
import arrow_icon from '../assets/arrow_icon.svg'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/AppContext'
const LandingPage = () => {

  const navigate = useNavigate()
  const {token} = useContext(Appcontext)

  return (
    <div className='bg-black min-h-screen'>
      <div className='px-6 sm:px-12 md:px-24 lg:px-47 py-8 bg-black'>

        /* Navbar */
        <div className='flex justify-between items-center flex-wrap gap-4'>
          <h1 className='text-white tracking-tight text-3xl font-serif'>
            Oss<span className='text-neutral-500 tracking-tight text-3xl'>ean</span>
          </h1>

          <div onClick={() => navigate(token ? '/home' : '/login')}  className='bg-white md:flex hidden items-center hover:scale-105 transition-all duration-300 shadow-md'>
            <button className='px-5 py-1.5 text-black font-medium'>Get Started</button>
            <img src={arrow_icon} className='w-5 h-5 mr-3' alt="arrow" />
          </div>
        </div>

        {/* Hero Section */}
        <div className='flex flex-col-reverse lg:flex-row mt-16 lg:mt-20 justify-between items-center gap-10'>

          {/* Left Content */}
          <div className='flex flex-col space-y-8 max-w-xl text-center lg:text-left'>
            {/* Heading */}
            <p className='text-neutral-500 tracking-tight leading-[1.2] [transform:scaleY(1.3)] text-[35px] sm:text-[40px] lg:text-[45px] font-serif'>
              Open Source In <span className='text-white'>Seconds</span> <br />
              Not In <span className='text-white'>Minutes</span>
            </p>

            {/* Highlighted Box & Subtext */}
            <div className='gap-3 flex flex-col'>
              <p className='text-neutral-300 w-fit mx-auto lg:mx-0 border px-2 border-neutral-200/40 tracking-wide text-base sm:text-lg'>
                Discover OSS Projects in <span className='text-white font-semibold'>Seconds.</span>
              </p>
              <p className='text-neutral-400 text-sm sm:text-base leading-tight tracking-wide font-medium max-w-md mx-auto lg:mx-0'>
                Revolutionized how people find open source projects, making it more <span className='text-white'>personal</span> and <span className='text-white'>relevant</span>.
              </p>
            </div>

            {/* Button */}
            <div className='bg-white flex items-center w-fit mx-auto lg:mx-0 hover:scale-105 transition-all duration-300 shadow-md'>
              <button onClick={() => navigate(token ? '/home' : '/login')}  className='px-5 py-1.5 text-black font-medium'>Get Started</button>
              <img src={arrow_icon} className='w-5 h-5 mr-3' alt="arrow" />
            </div>
          </div>

          {/* Right Image */}
          <img
            src={worldMap}
            className='w-[280px] sm:w-[350px] lg:w-[430px] h-auto opacity-90 mx-auto lg:mx-0'
            alt='world map'
          />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
