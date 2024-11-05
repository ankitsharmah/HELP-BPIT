import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OpenChatForum from './OpenChatForum'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  // console.log("this is home pade ")
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className='flex sm:h-[450px] md:h-[550px]   rounded-lg overflow-hidden bg-gray-400 outline outline-1 outline-red-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      <MessageContainer />
      <OpenChatForum />
    </div>
  )
}

export default HomePage