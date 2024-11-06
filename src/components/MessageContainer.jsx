import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedOpenForum, setSelectedUser } from '../redux/userSlice';
import { setMessages, setOpenMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';

const MessageContainer = () => {
    const { selectedUser, isTyping, onlineUsers,selectedOpenForum } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);
   if(selectedUser && selectedOpenForum){
    dispatch(setSelectedOpenForum(null))
   }
   function back(){
    dispatch(setSelectedUser(null));
    dispatch(setMessages(null));
    dispatch(setOpenMessages(null));
   }
    return (
        <>
            {
                
                    <div className='w-[99%] md:max-w-7xl mx-auto  h-screen bg-yellow-50 rounded-lg flex flex-col' >
                        <div className='flex gap-2 h-20 items-center bg-zinc-800 rounded-lg text-white px-4 py-2 mb-2'>
                            <div className={`avatar rounded-lg ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 bg-red-200 rounded-full' onClick={()=>{
                        back();
                    }}>
                                    <img src={`${BASE_URL}/api/avatar?name=${selectedUser?.nickName}`} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col '>
                                <div className='flex justify-between gap-2' >
                                    <p>{selectedUser?.nickName}</p>
                                    <p className=''>{isTyping? <p>typing...</p>:""}</p>

                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                
            }
        </>

    )
}

export default MessageContainer