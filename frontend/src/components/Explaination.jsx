import React from 'react'
import statue from '../assets/statue.png'
import video from '../assets/video(1).mp4'
const Explaination = () => {
  return (
    <div className='relative bg-black min-h-screen flex flex-col justify-center items-center px-4  sm:py-20 overflow-hidden'>
      {/* Background Image with subtle visibility */}
      <img
        src={statue}
        alt='background'
        className='absolute inset-10 w-full h-full object-cover opacity-80'
      />

      {/* Text & Video Content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center max-w-4xl'>
        {/* Heading */}
        <p className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold'>
          See It In Action
        </p>

        {/* Subtext */}
        <p className='text-neutral-400 py-4 sm:py-2 font-medium text-sm sm:text-base leading-relaxed'>
          Watch how Ossean transforms the way you <br className='hidden sm:block' />
          discover and explore open source projects
        </p>

        {/* Video */}
        <div className='mt-6 sm:mt-8 w-full flex justify-center'>
          <video
            className='w-[95%] sm:w-[600px] md:w-[800px] lg:w-[1000px]  shadow-lg border border-neutral-800'
            src={video}
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>
      </div>

      {/* Optional subtle gradient overlay for better contrast */}
      
    </div>
  )
}

export default Explaination