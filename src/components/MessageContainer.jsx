import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedOpenForum, setSelectedUser } from '../redux/userSlice';
import { setMessages, setOpenMessages } from '../redux/messageSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers,selectedOpenForum } = useSelector(store => store.user);
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
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col' >
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full' onClick={()=>{
                        back();
                    }}>
                                    <img src={selectedUser?.profilePic} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2' >
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) :""
            }
        </>

    )
}

export default MessageContainer