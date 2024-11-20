import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OpenChatForum from './OpenChatForum'
import homePage from '../assets/homePage.jpg'
import { IoBookOutline , IoSearchOutline  } from 'react-icons/io5'
import { PiChatsCircleLight } from 'react-icons/pi'
import { CiSearch } from 'react-icons/ci'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import Footer from '../shared/Footer'
import useKeepUserLoggedIn from '../hooks/useKeepUserLoggedIn'

const HomePage = () => {
  // useGetOtherUsers();
  const navigate = useNavigate();
  useKeepUserLoggedIn(navigate)

  // const navigate = useNavigate()
 
  return (
    <div className='p-3 md:p-7'>
    
    <div className='bg-red-50 '>
      <img src={homePage} alt="" className=' w-full'/>
    </div>

    <div className='md:h-20 text-white flex my-4 md:my-8 flex-col p-1 gap-2'>
      <h1 className='md:text-4xl text-3xl font-bold text-center'>Welcome to HELP-BPIT</h1>
      <p className=' text-center text-sm md:font-base md:text-xl'>Your one-step platform for collaboration,resource sharing and community support at BPIT.</p>
    </div>
      
    <div className='flex flex-wrap md:justify-between gap-3 md:gap-0'>
      <div onClick={()=>navigate("/open-forum")} className="outline outline-[.5px] rounded-[1.3rem] text-black flex flex-col items-center bg-[#f5e475]  cursor-pointer md:w-[30%]  p-2">
      <PiChatsCircleLight className="text-4xl font-bold  text-center text-black"/>
      <h3 className=' text-[1.5rem] font-bold p-1'>Open Forum</h3>
      <p className='text-base text-center'>Engage in disccusions and share insights with fllow students</p>
    
      </div>
      <div className="outline outline-[.5px]  rounded-[1.3rem] text-black flex flex-col   items-center bg-[#f96d5b]
       cursor-pointer md:w-[30%]  gap-1 p-2 md:hover:shadow-xl md:hover:shadow-[#ffffff52] md:hover:translate-y-2 ">
      <IoSearchOutline className="text-4xl font-bold text-center "/>
      <h3 className=' text-[1.5rem] font-bold p-1'>Lost and Found</h3>
      <p  className='text-base text-center'>Report lost itmes or find owners who are missing theirs</p>
      </div>
      <div className="outline outline-[.5px]  rounded-[1.3rem] text-black flex flex-col items-center  bg-[#f8b6cf] cursor-pointer md:w-[30%] outline-white  gap p-2">
      <IoBookOutline className="text-4xl font-bold text-center "/>
      <h3 className='text-[1.5rem] font-bold p-1'>Notes & Book Sharing</h3>
      <p className='text-base text-center'>Access and share valuable notes and books with others</p>
      </div>
    </div>
     
    
    <Footer />


    </div>
  )
}

export default HomePage