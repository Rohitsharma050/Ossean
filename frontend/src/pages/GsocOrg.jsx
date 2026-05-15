import React, { useContext,useState,useEffect } from 'react'
import { Appcontext } from '../context/AppContext'
import { useQuery } from '@tanstack/react-query'
import { ToastContainer,toast } from 'react-toastify'
import {
  Mail,
  Twitter,
  ExternalLink,
  Lightbulb,
  Code2,
  BookOpen
} from 'lucide-react'
import Loader from '../components/Loader'
import SearchBar from '../components/SearchBar'


function GsocOrg() {
  const [orgKeyword,setOrgKeyword] = useState("")
  const [year,setYear] = useState(2026)
  const {
token,backendUrl
  } = useContext(Appcontext)


  // Get orginaztion list year wise
    async function getOrgList(){
      
        const response = await fetch(
          `${backendUrl}/api/github/getOrg?year=${year}`
        );
        const data = await response.json();

        return data.data;
    
      }   
       
      const {

          data:gsocOrgList = [],isLoading,error
        
        } = useQuery({
          queryKey:["orgList",year],
          queryFn:getOrgList,
          enabled:!!token
        }
      );

       
    
     

        
      const filteredOrgList = gsocOrgList.filter((org)=>{
        const query = orgKeyword.toLowerCase()
        return (
          org.name.toLowerCase().includes(query) || org.category.toLowerCase().includes(query) || 
          org.topics.some( topic => topic.toLowerCase().includes(query))
        ) || org.technologies.some(tech=>tech.toLowerCase().includes(query))
      }
    
    )

  return (
    <>

      {/* HEADER */}

      <div className='flex items-center justify-between mx-5 mb-8 gap-4 flex-wrap'>

        <h1 className='text-white font-bold text-2xl'>
          GSOC Organizations
        </h1>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='
            border border-neutral-700 bg-black/50 text-white text-sm
            px-3 py-1 
            outline-none cursor-pointer
            hover:border-yellow-600 transition
          '
        >
          <option value="2026" className="bg-black text-white">
            Select Year
          </option>

          <option value="2026" className="bg-black text-white">2026</option>
          <option value="2025" className="bg-black text-white">2025</option>
          <option value="2024" className="bg-black text-white">2024</option>
          <option value="2023" className="bg-black text-white">2023</option>
          <option value="2022" className="bg-black text-white">2022</option>
          <option value="2021" className="bg-black text-white">2021</option>
          <option value="2020" className="bg-black text-white">2020</option>
          <option value="2019" className="bg-black text-white">2019</option>
          <option value="2018" className="bg-black text-white">2018</option>
          <option value="2017" className="bg-black text-white">2017</option>
          <option value="2016" className="bg-black text-white">2016</option>

        </select>

      </div>

    {/* Search bar */}

    <div className='mx-5 my-5'>
    <SearchBar placeholder="Search by name, technology, catoagory and topic..."
    
    keyword = {orgKeyword}
    setKeyword = {setOrgKeyword}
    
    
    />

    </div>

      {/* LOADER */}

      {
        isLoading && <Loader />
      }

      {/* ORGANIZATION LIST */}

      {
        !isLoading && (

          <div className='min-h-screen p-4'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

              {
                filteredOrgList?.map((org, index) => (

                  <div
                    key={index}
                    className='bg-black/60 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:scale-[1.01] transition-all duration-300'
                  >

                    {/* TOP */}

                    <div className='flex gap-3'>

                      <img
                        src={org.img_url}
                        alt={org.name}
                        className='w-12 h-12 rounded-lg object-cover bg-white p-1'
                      />

                      <div className='flex-1'>

                        <h2 className='text-white text-base font-semibold leading-snug'>
                          {org.name}
                        </h2>

                        <div className='flex flex-wrap gap-1 mt-1'>

                          <span className='px-2 py-[2px] rounded-md bg-zinc-700/60 text-zinc-300 text-[10px]'>
                            {org.category}
                          </span>

                          {
                            org.num_projects && (
                              <span className='px-2 py-[2px] rounded-md border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-[10px]'>
                                {org.num_projects} Projects
                              </span>
                            )
                          }

                        </div>

                      </div>

                    </div>

                    {/* DESCRIPTION */}

                    <p className='text-zinc-300 mt-3 text-xs leading-relaxed line-clamp-2'>
                      {org.desc}
                    </p>

                    {/* WEBSITE */}

                    <a
                      href={org.url}
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-1 text-blue-400 hover:text-blue-300 mt-2 text-xs w-fit'
                    >
                      <ExternalLink size={12} />
                      Website
                    </a>

                    {/* TECHNOLOGIES */}

                    <div className='mt-4'>

                      <h3 className='text-zinc-400 uppercase tracking-wider text-[10px] mb-2'>
                        Technologies
                      </h3>

                      <div className='flex flex-wrap gap-1.5'>

                        {
                          org.technologies?.slice(0, 5).map((tech, i) => (
                            <span
                              key={i}
                              className='px-2 py-[3px] rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[10px]'
                            >
                              {tech}
                            </span>
                          ))
                        }

                      </div>

                    </div>

                    {/* TOPICS */}

                    <div className='mt-4'>

                      <h3 className='text-zinc-400 uppercase tracking-wider text-[10px] mb-2'>
                        Topics
                      </h3>

                      <div className='flex flex-wrap gap-1.5'>

                        {
                          org.topics?.slice(0, 4).map((topic, i) => (
                            <span
                              key={i}
                              className='px-2 py-[3px] rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-[10px]'
                            >
                              {topic}
                            </span>
                          ))
                        }

                      </div>

                    </div>

                    {/* CONTACT */}

                    <div className='mt-4'>

                      <h3 className='text-zinc-400 uppercase tracking-wider text-[10px] mb-2'>
                        Contact
                      </h3>

                      <div className='flex flex-wrap gap-1.5'>

                        {
                          org.contact_email && (
                            <a
                              href={org.contact_email}
                              className='flex items-center gap-1 px-2 py-1 rounded-full border border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 text-[10px]'
                            >
                              <Mail size={10} />
                              Email
                            </a>
                          )
                        }

                        {
                          org.twitter_url && (
                            <a
                              href={org.twitter_url}
                              target='_blank'
                              rel='noreferrer'
                              className='flex items-center gap-1 px-2 py-1 rounded-full border border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 text-[10px]'
                            >
                              <Twitter size={10} />
                              Twitter
                            </a>
                          )
                        }

                      </div>

                    </div>

                    {/* BUTTONS */}

                    <div className='flex flex-wrap gap-2 mt-5'>

                      {
                        org.ideas_url && (
                          <a
                            href={org.ideas_url}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 text-xs'
                          >
                            <Lightbulb size={10} />
                            Ideas
                          </a>
                        )
                      }

                      {
                        org.projects_url && (
                          <a
                            href={org.projects_url}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs'
                          >
                            <Code2 size={10} />
                            Source
                          </a>
                        )
                      }

                      {
                        org.guide_url && (
                          <a
                            href={org.guide_url}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 text-xs'
                          >
                            <BookOpen size={10} />
                            Contribute
                          </a>
                        )
                      }

                    </div>

                  </div>

                ))
              }

            </div>

            {filteredOrgList.length === 0 && (
            
                  <div className="text-center text-neutral-400 py-8">
                      No organizations found.
                  </div>
            
                )}
          </div>

        )
      }


    </>
  )

}

export default GsocOrg