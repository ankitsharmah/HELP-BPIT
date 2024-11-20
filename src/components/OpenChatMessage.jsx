import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
import OpenForumMessage from './OpenForumMessage';
import useOpenGetMessages from '../hooks/useOpenGetMessage';

const OpenChatMessage = () => {
    // useGetMessages();
    useOpenGetMessages();
    useGetRealTimeMessage();
    const { selectedUser } = useSelector(store => store.user);
    const { openChats } = useSelector(store => store.message);

    // Access the messages for the selected user
    // const userMessages = messages[selectedUser?._id] || []; // Default to empty array if no messages found
// console.log(openChats)
    return (
        <div className='px-4 md:h-[550px]    overflow-y-scroll '>
            {openChats.messages?.map((message) => (
                <OpenForumMessage key={message._id} message={message} />
            ))}
        </div>
    );
};

export default OpenChatMessage;
