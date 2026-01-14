import React, { useContext } from 'react'
import { feedback } from '../assets/assets'
import arrow_icon from '../assets/arrow_icon.svg'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/AppContext'
const Feedback = () => {

  const navigate = useNavigate()
  const {token} = useContext(Appcontext)
  return (
    <div className='flex flex-col bg-black justify-center items-center px-4 sm:px-8 md:px-16 py-16 sm:py-20 text-center'>
      {/* Heading Section */}
      <div className='flex flex-col items-center justify-center max-w-3xl mb-10'>
        <p className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
          What People are Saying
        </p>

        <p className='text-neutral-400 py-4 sm:py-3 font-medium text-sm sm:text-base leading-relaxed'>
          Real feedback from real developers <br className='hidden sm:block' />
          see what the <span className='text-white font-semibold'>Community </span>is saying about{' '}
          <span className='text-white font-semibold'>Ossean</span>
        </p>
      </div>

      {/* Feedback Cards Section */}
      <div className='w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white'>
        {feedback.map((item, index) => (
          <div
            key={index}
            className='flex flex-col justify-between bg-neutral-900/60 border border-neutral-800  p-5 hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg min-h-[180px]'
          >
            {/* User Info */}
            <div className='flex flex-col text-left'>
              <p className='text-white font-semibold text-base'>{item.name}</p>
              <p className='text-neutral-400 text-xs mb-2'>{item.id}</p>
            </div>

            {/* Comment */}
            <p className='text-neutral-300 text-sm italic mb-3 text-left'>
              “{item.comment}”
            </p>

            {/* Date */}
            <p className='text-neutral-500 text-xs text-right'>{item.date}</p>
          </div>
        ))}
      </div>

      <p className='text-neutral-400 py-8  '>Join hundereds of developers already using Ossean</p>
       <div className='bg-white flex items-center hover:scale-105 transition-all duration-300 shadow-md'>
                  <button onClick={() => navigate(token ? '/home' : '/login')}  className='px-5 py-1.5 text-black font-medium'>Get Started Today</button>
                  <img src={arrow_icon} className='w-5 h-5 mr-3' alt="arrow" />
        </div>
    </div>
  )
}

export default Feedback
