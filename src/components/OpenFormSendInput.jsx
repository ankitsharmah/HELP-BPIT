// import axios from 'axios';
// import React, { useState } from 'react'
// import { IoSend } from 'react-icons/io5';
// import { setMessages, setOpenMessages } from '../redux/messageSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import {BASE_URL} from "../main"

// function OpenFormSendInput() {
//     const [content, setMessage] = useState("");
//     const dispatch = useDispatch();
//     const {authUser} = useSelector(store=>store.user);
//     const {openChats} = useSelector(store=>store.message);

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`${BASE_URL}/api/v1/messages/openform/send/${authUser.user?._id}`, {content}, {
//                 headers:{
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 },
//                 withCredentials:true
//             });

//             console.log("res ji ",res.data)
//             console.log(openChats)
//             // const upmsgs = [...openChats?.messages, res?.data?.newMessage]
//             // const updatedOpenChats = {...openChats ,messages:upmsgs}
//             dispatch(setOpenMessages(res?.data?.chatForum))
//         } catch (error) {
//             console.log(error);
//         } 
//         setMessage("");
//     }
//     return (
//         <form onSubmit={onSubmitHandler} className='px-4 my-3'>
//             <div className='w-full relative'>
//                 <input
//                     value={content}
//                     onChange={(e) => setMessage(e.target.value)}
//                     type="text"
//                     placeholder='Send a message...'
//                     className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
//                 />
//                 <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
//                     <IoSend />
//                 </button>
//             </div>
//         </form>
//     )
// }


// export default OpenFormSendInput


import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOpenMessages } from '../redux/messageSlice';
import { BASE_URL } from "../main";

function OpenFormSendInput() {
    const [tosend, setMessage] = useState("");
    const dispatch = useDispatch();
    const { authUser } = useSelector((store) => store.user);
    const { openChats } = useSelector((store) => store.message);
    const { socket } = useSelector((store) => store.socket);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    
        // Check if the message is not empty
        if (!tosend.trim()) {
            alert("Please enter a message!");
            return; // Exit if the message is empty
        }
    
        try {
            const content = tosend; // Get the message content
            setMessage(""); // Clear the input field
    
            // // Emit the open forum message in real-time through Socket.IO
            // socket.emit("sendOpenForumMessage", {
            //     senderId: authUser.user._id,
            //     message: content,
            // });
    
            // Save the message to the database
            const res = await axios.post(
                `${BASE_URL}/api/v1/messages/openform/send/${authUser._id}`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                }
            );
    
            // Optimistically update the local state
            const upmsgs = [...openChats?.messages, res?.data?.newMsg];
            const updatedOpenChats = { ...openChats, messages: upmsgs };
            // console.log("Sent open message: ", updatedOpenChats);
    
            // Dispatch the updated messages to the Redux store
            dispatch(setOpenMessages(updatedOpenChats));
        } catch (error) {
            console.error("Error saving message to the database:", error);
            alert("Failed to send message, please try again.");
        }
    
        // Clear the input after message is sent
        setMessage("");
    };
    

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={tosend}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    );
}

export default OpenFormSendInput;
