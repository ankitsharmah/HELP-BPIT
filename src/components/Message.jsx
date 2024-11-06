import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../main';

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    // Convert the timestamp to a Date and format it to "h:mm AM/PM"
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        // Using options to format to "h:mm AM/PM"
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options).replace(/^0/, ''); // Remove leading zero if present
    };

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?.user._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={message?.senderId === authUser?.user._id ? `${BASE_URL}/api/avatar?name=${authUser?.user?.nickName}` : `${BASE_URL}/api/avatar?name=${selectedUser?.nickName}`} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-black">{formatTime(message?.createdAt)}</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?.user._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.message}
            </div>
        </div>
    );
};

export default Message;
