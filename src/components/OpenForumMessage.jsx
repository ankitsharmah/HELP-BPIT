import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";
import { BASE_URL } from '../main';

const OpenForumMessage = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        // Using options to format to "h:mm AM/PM"
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options).replace(/^0/, ''); // Remove leading zero if present
    };
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    // console.log(message)
    return (
        <div ref={scroll} className={`chat ${message.senderId?._id === authUser?.user._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img alt="User Avatar" src={message?.senderId === authUser?.user._id ? `${BASE_URL}/api/avatar?name=${authUser?.user?.nickName}` : `${BASE_URL}/api/avatar?name=${message.senderId.nickName}`} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{formatTime(message?.timestamp)}</time>
            </div>
            <div className={`chat-bubble ${message.senderId?._id !== authUser?.user._id ? 'bg-gray-200 text-black' : ''} `}>{message?.content}</div>
        </div>
    )
}

export default OpenForumMessage