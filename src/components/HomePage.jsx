import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import OpenChatForum from './OpenChatForum'
import homePage from '../assets/bg-pic-bpit.png'
import { IoBookOutline , IoNewspaperSharp, IoSearchOutline  } from 'react-icons/io5'
import { PiChatsCircleLight, PiNewspaper } from 'react-icons/pi'
import { CiSearch } from 'react-icons/ci'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import Footer from '../shared/Footer'
import useKeepUserLoggedIn from '../hooks/useKeepUserLoggedIn'
// import LostAndFoundDisplay from './LostAndFoundDisplay'
import { LostFoundDisplay } from './LostFoundDisplay'
import useGetReports from '../hooks/useGetReports'

const HomePage = () => {
  // useGetOtherUsers();
  const navigate = useNavigate();
  // useKeepUserLoggedIn(navigate)
  // useGetReports();
  // const navigate = useNavigate()
 
  return (
    <div className='p-1 md:p-7'>
    
    <div className='h-[25vh] md:h-[50vh] w-full '>
      <img src={homePage} alt="" className=' w-full h-full object-cover'/>
    </div>

    <div className='md:h-fit text-white flex md:my-8 flex-col p-1 gap-2'>
      <h1 className='md:text-4xl text-3xl font-bold p-3 text-center'>Welcome to HELP-BPIT</h1>
      <p className=' text-center  text-sm pb-4 md:pb-0 md:font-base md:text-xl'>Your one-step platform for collaboration,resource sharing and community support at BPIT.</p>
    </div>


      <div className=' bg-yellow-5 py-3  flex flex-col '>

        {/* <h1 className='text-center pb-2 text-xl font-bold text-white '>Latest Found</h1> */}

        {/* <LostFoundDisplay /> */}

        {/* <h1 className='text-center pb-2 text-xl font-bold text-white '>Latest Lost </h1> */}

        <LostFoundDisplay />
      </div>
    
    <div className='flex flex-wrap  w-full  justify-center mt-3 md:justify-around gap-2  md:gap-2'>
    

    
      <div className="outline hidden  outline-[.5px]  rounded-[1.3rem] text-black md:flex flex-col items-center  bg-[#f8b6cf] cursor-pointer md:w-[48%] w-[47%] outline-white  gap p-2">

     <div className='flex md:flex-col w-full  justify-between   items-center'>
     <IoBookOutline  className="text-7xl h-12  w-16  font-bold  text-center text-black"/>
     <h3 className=' text-[1.5rem] text-center  font-bold p-1'>Notes & Book Sharing</h3>
     </div>
      <p className='text-base md:text-center'>Access and share valuable notes and books with others</p>
      </div>

    <div onClick={()=>navigate("/lost-found")}  className="outline flex  outline-[.5px]   rounded-[1.3rem] text-black  flex-col items-center  bg-[#f96d5b]  cursor-pointer md:w-[48%] w-[60%] outline-white  gap-1 p-2">
     <div className='flex md:flex-col w-full  justify-around   items-center'>
     <IoSearchOutline  className="text-7xl   font-bold  text-center text-black"/>
     <h3 className=' text-[1.6rem] text-center  font-bold p-1'>
     Lost and Found </h3>
     </div>
     <div className='bg-[#000000a9] h-[1px] w-[65%] '></div>
      <p className='md:text-base text-base  md:text-center'>  Report lost itmes or find owners who are missing theirs </p>
      </div>

      <div onClick={()=>navigate("/open-forum")} className="outline outline-[.5px] rounded-[1.3rem]  text-black flex flex-col items-center bg-[#f5e475]  cursor-pointer w-[37%] md:w-[48%]  p-2">
      <div className='flex flex-col w-full  justify-between   items-center'>
      <PiChatsCircleLight className="text-6xl font-bold  text-center text-black"/>
      <h3 className=' text-[1.36rem] text-center  font-extrabold p-1'>Open Forum</h3>
      </div>
      <p className='md:text-base md:text-center text-wrap text-xs'>Engage in disccusions with fllow students</p>
    
      </div>
  
      
      <div  className="outline outline-[.5px] rounded-[1.3rem]  text-black flex flex-col items-center bg-[#75f5a2]  cursor-pointer w-[37%] md:w-[48%]  p-2">
          <div className='flex flex-col w-full  justify-between   items-center'>
          <PiNewspaper className="text-4xl h-12  w-16  font-bold  text-center text-black"/>
          <h3 className=' text-[1.5rem] text-center  font-bold p-1'>News</h3>
          </div>
      <p className='md:text-base text-xs  md:text-center  text-[#000000fc] text-wrap '>Know latest opening at Alumini work place</p>
    
      </div>


      <div className="outline flex  outline-[.5px]   rounded-[1.3rem] text-black md:hidden flex-col items-center text-center   bg-[#f8b6cf] cursor-pointer md:w-[30%] w-[60%] outline-white  gap-1 p-2">
      <div className='flex md:flex-col w-full  justify-between   items-center'>
      <IoBookOutline  className="text-7xl h-12  w-16  font-bold  text-center text-black"/>
      <h3 className=' text-[1.2rem] text-center  font-bold p-1'>Notes & Book Sharing</h3>
      </div>
      <div className='bg-[#0000002a] h-[1px] w-[65%] '></div>
      <p className='text-base md:text-center'>Access and share valuable notes and books with others</p>
      </div>

    </div>
     
    {/* <BookQuotesSlider /> */}
    <Footer />


    </div>
  )
}

export default HomePage