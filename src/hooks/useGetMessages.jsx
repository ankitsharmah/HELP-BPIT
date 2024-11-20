import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';

const useGetMessages = () => {
    const { selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    // console.log("selecting user chats ",selectedUser._id)
    // console.log(selectedUser._id)
    useEffect(() => {
        if (!selectedUser?._id) return; // Only fetch if a user is selected

        const fetchMessages = async () => {
            dispatch(setIsLoading(true));
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/messages/${selectedUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                // console.log("Fetched messages:", res);
                if(res.data.success){
                    dispatch(setMessages(res.data.messages)); // Store fetched messages in Redux

                }else{
                    dispatch(setMessages([])); // Store fetched messages in Redux

                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }finally{
            dispatch(setIsLoading(false));

            }
        };

        fetchMessages();
    }, [selectedUser?._id, setMessages]); // Update when selectedUser changes
};

export default useGetMessages;
