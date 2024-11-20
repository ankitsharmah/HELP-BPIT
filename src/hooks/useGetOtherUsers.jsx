import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '../main';
import { setIsLoading, setOpenMessages } from '../redux/messageSlice';

const useGetOtherUsers = () => {
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
                dispatch(setIsLoading(true))
                console.log("Fetching open forum messages...");
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/messages/openform`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("Fetched open forum messages:", res.data.openChatmessages);
                dispatch(setOpenMessages(res.data.openChatmessages));
                dispatch(setIsLoading(false))
            } catch (error) {
                console.error("Error fetching open forum messages:", error);
            }
        };

        fetchOpenForum();
        // fetchOtherUsers();
    }, []); // Include dispatch as a dependency
};

export default useGetOtherUsers;
