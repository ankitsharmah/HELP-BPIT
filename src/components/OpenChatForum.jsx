import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedOpenForum, setSelectedUser } from '../redux/userSlice';
import OpenChatMessage from './OpenChatMessage';
import OpenFormSendInput from './OpenFormSendInput';
import { MdForum } from 'react-icons/md';
import { setOpenMessages } from '../redux/messageSlice';

const OpenChatForum = () => {
    const { selectedOpenForum, authUser, selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    if(selectedUser && selectedOpenForum){
        console.log("in jiiiiiijoiajoajcodjcidcosdjjovjosi")
        dispatch(setSelectedUser(null))
       }
    // const isOnline = onlineUsers?.includes(selectedUser?._id);
//    console.log(selectedOpenForum)
function back(){
    dispatch(setSelectedOpenForum(null));
    dispatch(setOpenMessages(null));

   }
    return (
        <>
            {
                selectedOpenForum !== null ? (
                    <div className='md:w-[550px]  overflow-scroll flex flex-col'>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'  >
                        <div className='w-12 h-9 rounded-full'  onClick={()=>{
                        back();
                    }} >
                        <MdForum />
                        </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedOpenForum?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <OpenChatMessage />
                        <OpenFormSendInput />
                    </div>
                ) :""
            }
        </>

    )
}

export default OpenChatForum