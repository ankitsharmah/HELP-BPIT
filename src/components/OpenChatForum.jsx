import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenChatMessage from './OpenChatMessage';
import OpenFormSendInput from './OpenFormSendInput';
import { MdForum } from 'react-icons/md';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { setIsLoading, setOpenMessages } from '../redux/messageSlice';
import axios from 'axios';
import { BASE_URL } from '../main';

const OpenChatForum = () => {
    console.log("Rendering OpenChatForum...");
    // useGetOtherUsers(); // This should be called when the component renders

    const [isLoading, setIsLoading] = useState(true); // Local state for loading
    const { openChats } = useSelector((state) => state.message); // Messages from Redux
    const { selectedOpenForum } = useSelector((state) => state.user); // Selected forum info from Redux
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useGetOtherUsers: Hook executed");

        // const fetchOtherUsers = async () => {
        //     try {
        //         console.log("Fetching other users...");
        //         axios.defaults.withCredentials = true;
        //         const res = await axios.get(`${BASE_URL}/api/v1/user`, {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
        //             },
        //         });
        //         console.log("Fetched other users:", res.data);
        //         dispatch(setOtherUsers(res.data));
        //     } catch (error) {
        //         console.error("Error fetching other users:", error);
        //     }
        // };

        const fetchOpenForum = async () => {
            try {
                console.log("doing true")
                setIsLoading(true)
                console.log("Fetching open forum messages...");
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/messages/openform`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("Fetched open forum messages:", res.data.openChatmessages);
                dispatch(setOpenMessages(res.data.openChatmessages));
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching open forum messages:", error);
            }
        };

        fetchOpenForum();
        // fetchOtherUsers();
    }, []);

    return (
        <div className="h-[93vh] max-w-4xl m-auto  overflow-y-scroll flex flex-col">
            <div className="flex gap-2 items-center mt-[0.77rem] bg-zinc-800 text-white px-4 py-2 mb-2">
                <div className="w-12 h-9 rounded-full">
                    <MdForum />
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between gap-2">
                        <p>{selectedOpenForum?.fullName || "OPEN CHAT-FORUM"}</p>
                    </div>
                </div>
            </div>
            {isLoading ? ( // Display a loading indicator when isLoading is true
                <div className="text-center py-4">Loading open chat messages...</div>
            ) : (
                <OpenChatMessage />
            )}
            <OpenFormSendInput />
        </div>
    );
};

export default OpenChatForum;
