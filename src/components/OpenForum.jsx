import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser, setSelectedOpenForum } from '../redux/userSlice';
import { MdForum } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const OpenForum = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {selectedUser,selectedOpenForum, onlineUsers} = useSelector(store=>store.user);
    // const isOnline = onlineUsers?.includes(user._id);
    const selectedUserHandler = (user) => {
        console.log("selecting user ",user)
        dispatch(setSelectedOpenForum(user));
        dispatch(setSelectedUser(null))
    }
    return (
        <>
            <div onClick={() => {selectedUserHandler(user);
            navigate("/open-chat")}} className={` ${selectedOpenForum?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
            <div className='w-12 rounded-full'>
                <MdForum className='text-4xl' />
                    
                    </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>Open Chat forum</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OpenForum