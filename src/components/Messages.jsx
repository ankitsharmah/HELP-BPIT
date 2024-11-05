import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    // Access the messages for the selected user
    // const userMessages = messages[selectedUser?._id] || []; // Default to empty array if no messages found

    return (
        <div className='px-4 md:h-[550px] h-[500px] w-[98%] md:flex-1 overflow-y-scroll '>
            {messages?.map((message) => (
                <Message key={message._id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
