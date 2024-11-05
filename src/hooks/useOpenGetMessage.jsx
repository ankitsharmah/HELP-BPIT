import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setOpenMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';
import { setSelectedOpenForum } from '../redux/userSlice';

const useOpenGetMessages = () => {
    const { openChats } = useSelector((store) => store.message);
    const dispatch = useDispatch();

    // console.log("selecting user chats ",selectedUser._id)
    // console.log(selectedUser._id)
    useEffect(() => {
        // if (!selectedUser?._id) return; // Only fetch if a user is selected

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/messages/openform`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                // console.log("Fetched messages:", res);
                if(res.data.success){
                    dispatch(setOpenMessages(res.data.openChatmessages)); // Store fetched messages in Redux

                }else{
                    dispatch(setMessages([])); // Store fetched messages in Redux

                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [setSelectedOpenForum]); // Update when selectedUser changes
};

export default useOpenGetMessages;
