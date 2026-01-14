import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react' // Lucide React icons

const Footer = () => {
  return (
    <div className='bg-black border-t border-neutral-700 px-8    sm:px-10 py-12'>
      <div className='text-white flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left'>

        {/* Left Side */}
        <p className='text-neutral-500 text-xs sm:text-sm px-2'>
          © 2025 All Rights Reserved
        </p>

        {/* Center */}
        <p className='text-white  md:pl-15 font-semibold tracking-wide'>
          Ossean
        </p>

        {/* Right Side — Social Links */}
        <div className='flex gap-5 px-2'>
          <a
            href='https://github.com/Rohitsharma050/Ossean'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-neutral-400 text-xs pl-2 hover:text-white transition-all duration-200'
          >
            <Github className='w-4 h-4' />
            <span className='hidden sm:inline'>GitHub</span>
          </a>

          <a
            href='https://www.linkedin.com/in/rohitsharma50/'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-neutral-400 text-xs pl-2 hover:text-white transition-all duration-200'
          >
            <Linkedin className='w-4 h-4' />
            <span className='hidden sm:inline '>LinkedIn</span>
          </a>

          <a
            href='mailto:rohitsharmasa120111@gmail.com'
            className='flex items-center gap-2 text-neutral-400 text-xs pl-2 hover:text-white transition-all duration-200'
          >
            <Mail className='w-4 h-4' />
            <span className='hidden sm:inline'>Email</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
