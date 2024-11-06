// import React, {useState } from 'react'
// import { IoSend } from "react-icons/io5";
// import axios from "axios";
// import {useDispatch,useSelector} from "react-redux";
// import { setMessages } from '../redux/messageSlice';
// import { BASE_URL } from '../main';

// const SendInput = () => {
//     const [message, setMessage] = useState("");
//     const dispatch = useDispatch();
//     const {selectedUser} = useSelector(store=>store.user);
//     const {messages} = useSelector(store=>store.message);

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`${BASE_URL}/api/v1/messages/send/${selectedUser?._id}`, {message}, {
//                 headers:{
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 },
//                 withCredentials:true
//             });
//             dispatch(setMessages([...messages, res?.data?.newMessage]))
//         } catch (error) {
//             console.log(error);
//         } 
//         setMessage("");
//     }
//     return (
//         <form onSubmit={onSubmitHandler} className='px-4 my-3'>
//             <div className='w-full relative'>
//                 <input
//                     value={message}
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

// export default SendInput

// import React, { useState } from 'react';
// import { IoSend } from "react-icons/io5";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from '../redux/messageSlice';
// import { BASE_URL } from '../main';

// const SendInput = () => {
//     const [tosend, setMessage] = useState("");
//     const dispatch = useDispatch();
//     const { selectedUser } = useSelector(store => store.user);
//     const { messages } = useSelector(store => store.message);
//     const { socket } = useSelector(store => store.socket);
//     const { authUser } = useSelector(store => store.user);

//     function  onChangeHandler(){
//         console.log("typing input")
//         socket.emit("typing", {
//             senderId: authUser.user._id, // Assuming authUser is the current logged-in user
//             receiverId: selectedUser._id, // Assuming selectedUser is the user being messaged
//             typing: true,
//         });
//     };
    
//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         // if (!message.trim()) return; // Prevent sending empty messages

//         // Emit the message in real-time via Socket.IO
//         // socket.emit("sendPrivateMessage", {
//         //     receiverId: selectedUser._id,
//         //     message,
//         //     senderId: authUser.user._id,
//         // });

//         // Optimistically update the local message state
//         // dispatch(setMessages([...messages, { senderId: authUser.user._id, receiverId: selectedUser._id, message }]));

//         try {
//             // Save the message to the database
//             if(!tosend.trim()){
//                 alert("abe sade msg dal pehle");
//                 return;
//             }

//             const  message=tosend;
//             // console.log("to dend ",tosend)
//             setMessage("")

//             const res = await axios.post(
//                 `${BASE_URL}/api/v1/messages/send/${selectedUser?._id}`,
//                 { message },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                     withCredentials: true,
//                 }
//             );
//             const updatedMessage = [...messages, res?.data?.newMessage];
//             // console.log("input ",updatedMessage)
//             dispatch(setMessages(updatedMessage));
//         } catch (error) {
//             console.error("Failed to save message:", error);
//         }

//         setMessage(""); // Clear the input after sending
//     };

//     return (
//         <form onSubmit={onSubmitHandler} className='px-4 my-3'>
//             <div className='w-full relative'>
//                 <input
//                     value={tosend}
//                     onChange={(e) => {setMessage(e.target.value);
//                     onChangeHandler()
                    
//                     }}
//                     type="text"
//                     placeholder='Send a message...'
//                     className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
//                 />
//                 <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
//                     <IoSend />
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default SendInput;


import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';

const SendInput = () => {
    const [tosend, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser, authUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);
    const { socket } = useSelector(store => store.socket);

    // Define a timeout variable to manage "stopped typing" event
    let typingTimeout;

    // Function to handle typing event
    function onChangeHandler() {
        // Emit typing event to the backend
        if (socket) {
            socket.emit("typing", {
                senderId: authUser.user._id,
                receiverId: selectedUser._id,
                typing: true,
            });
        }

        // Clear the previous timeout to prevent multiple 'typing' events being sent
        clearTimeout(typingTimeout);

        // Set a new timeout to emit 'typing: false' after 1.5 seconds of inactivity
        typingTimeout = setTimeout(() => {
            if (socket) {
                socket.emit("typing", {
                    senderId: authUser.user._id,
                    receiverId: selectedUser._id,
                    typing: false,
                });
            }
        }, 1000); // 1.5 seconds of inactivity
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!tosend.trim()) {
            alert("Please enter a message.");
            return;
        }

        try {
            const message = tosend;
            setMessage("");

            // Save the message to the database
            const res = await axios.post(
                `${BASE_URL}/api/v1/messages/send/${selectedUser?._id}`,
                { message },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                }
            );

            // Update messages in the Redux store
            const updatedMessage = [...messages, res?.data?.newMessage];
            dispatch(setMessages(updatedMessage));

            // Emit 'typing: false' when a message is sent
            if (socket) {
                socket.emit("typing", {
                    senderId: authUser.user._id,
                    receiverId: selectedUser._id,
                    typing: false,
                });
            }

        } catch (error) {
            console.error("Failed to save message:", error);
        }

        setMessage(""); // Clear the input field after sending the message
    };

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={tosend}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        onChangeHandler(); // Handle typing
                    }}
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
};

export default SendInput;
