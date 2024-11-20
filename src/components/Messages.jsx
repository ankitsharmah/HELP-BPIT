import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { selectedUser } = useSelector(store => store.user);
    const { messages ,isLoading} = useSelector(store => store.message);

    // Access the messages for the selected user
    // const userMessages = messages[selectedUser?._id] || []; // Default to empty array if no messages found

    return (
        <div className={isLoading? "h-[97vh] w-[95%] flex items-center justify-center":'px-4 md:h-[550px] h-[500px] w-[98%] md:flex-1 overflow-y-scroll '}>
            {!isLoading ? messages?.map((message) => (
                <Message key={message._id} message={message} />
            )):<div className="loader-chat  text-white flex items-center justify-center"></div>
}
        </div>
    );
};

export default Messages;
