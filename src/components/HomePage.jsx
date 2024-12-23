import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
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
import axios from 'axios'
import { BASE_URL } from '../main'
import { BiLoader } from 'react-icons/bi'
import { setIseServerLoading } from '../redux/messageSlice'

const HomePage = () => {
  // useGetOtherUsers();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isServerStarting} = useSelector(store=>store.message)
  // useKeepUserLoggedIn(navigate)
  // useGetReports();
  // const navigate = useNavigate()

  useEffect(()=>{
      async function loader (){
              try {
                if(isServerStarting){
                  const res = await axios.get(BASE_URL);
                  if(res.data.success){
                      dispatch(setIseServerLoading(false));
                  }
                }
                    else{
                      return;
                    }
               

              } catch (error) {
                console.log(error)
              }
      }
      loader();
  },[])
 
  return (<>

   {
    isServerStarting ? <div className='h-[100vh] z-50 top-0 left-0 fixed w-full bg-gray-600/80 flex items-center justify-center text-red-600'>
    <div className='h-20 w-72 md:w-80 flex items-center justify-center rounded outline outline-[#43ff49] '>
      <p className=' text-[#43ff49] font-bold text-xl animate-bounce'>
      please wait server is starting 
      </p>

    </div>
    </div> :"" 
   }
   <div className='p-1 bg-[#121926] md:p-7'>
    
    <div className='h-[25vh] md:h-[50vh] w-full '>
      <img src={homePage} alt="" className=' w-full h-full object-cover'/>
    </div>

    <div className='md:h-fit text-white flex md:my-8 flex-col p-1 gap-2'>
      <h1 className='md:text-4xl text-3xl font-bold p-3 text-center'>Welcome to HELP-BPIT</h1>
      <p className=' text-center  text-sm pb-4 md:pb-0 md:font-base md:text-xl'>Your one-step platform for collaboration,resource sharing and community support at BPIT.</p>
    </div>


      <div className=' bg-yellow-5 py-3  containerr min-h-[173px]  flex flex-col '>

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

    <div onClick={()=>navigate("/lost-found")}  className="outline flex  outline-[.5px]   text-white  flex-col items-center  bg-[#E63946] text-white p-6 rounded-xl shadow-lg space-y-4 cursor-pointer md:w-[48%] w-[60%] outline-white  gap-1 ">
     <div className='flex md:flex-col w-full  justify-around   items-center'>
     <IoSearchOutline  className="text-7xl   font-bold  text-center text-"/>
     <h3 className=' text-[1.6rem] text-center  font-bold p-1'>
     Lost and Found </h3>
     </div>
 
      <p className='md:text-base text-base  md:text-center'>  Report lost itmes or find owners who are missing theirs </p>
      </div>

      <div onClick={()=>navigate("/open-forum")} className="outline outline-[.5px] rounded-[1.3rem]  text-black flex flex-col items-center   shadow-lg space-y-4   bg-[#FAB005] cursor-pointer w-[37%] md:w-[48%]  p-2">
      <div className='flex flex-col w-full  justify-between   items-center'>
      <PiChatsCircleLight className="text-6xl font-bold  text-center text-black"/>
      <h3 className=' text-[1.36rem] text-center  font-extrabold p-1'>Open Forum</h3>
      </div>
      <p className='md:text-base md:text-center text-wrap text-xs'>Engage in disccusions with fllow students</p>
    
      </div>
  
      
      <div  className="outline outline-[.5px]  flex flex-col items-center bg-[#2A9D8F] text-white p-6 rounded-xl shadow-lg  cursor-pointer p-6 rounded-xl shadow-lg space-y-4 w-[37%] md:w-[48%]  p-">
          <div className='flex flex-col w-full  justify-between   items-center'>
          <PiNewspaper className="text-4xl h-12  w-16  font-bold  text-center text-[2B2B2B]"/>
          <h3 className=' text-[1.5rem] text-center  font-bold p-1'>News</h3>
          </div>
      <p className='md:text-base text-xs  md:text-center   text-wrap '>Know latest opening at Alumni work place</p>
    
      </div>


      <div className="outline flex  outline-[.5px]    md:hidden flex-col items-center text-center   bg-[#F4A261] text-[#1E2A38] p-6 rounded-xl shadow-lg space-y-4 cursor-pointer md:w-[30%] w-[60%] outline-white  gap-1 ">
      <div className='flex md:flex-col w-full  justify-between   items-center'>
      <IoBookOutline  className="text-7xl h-12  w-16  font-bold  text-center text-black"/>
      <h3 className=' text-[1.2rem] text-center  font-bold p-1'>Notes & Book Sharing</h3>
      </div>
      <div className='bg-[#0000002a] h-[1px] w-[65%] '></div>
      <p className='text-base md:text-center'>Access and share valuable notes and books with others</p>
      </div>

    </div>

  
      {/* Featured Updates Section */}
      <div className='bg-[#457B9D] text-white p-6 mt-6 rounded-lg'>
        <h2 className='text-2xl font-bold mb-4'>Featured Updates</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='bg-[#A8DADC] p-4 rounded-lg'>
            <h3 className='font-bold'>New Book Arrivals</h3>
            <p>Check out the latest additions to the library.</p>
          </div>
          <div className='bg-[#F4A261] p-4 rounded-lg'>
            <h3 className='font-bold'>Alumni Webinar</h3>
            <p>Join our webinar with successful alumni.</p>
          </div>
          <div className='bg-[#E63946] p-4 rounded-lg'>
            <h3 className='font-bold'>Placement Drives</h3>
            <p>Don’t miss out on upcoming placement sessions.</p>
          </div>
        </div>
      </div>

     
    {/* <BookQuotesSlider /> */}
    <Footer />


    </div>
  </>
  )
}

export default HomePage