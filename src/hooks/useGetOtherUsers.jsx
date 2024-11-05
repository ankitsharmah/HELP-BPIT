import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '../main';
import { setOpenMessages } from '../redux/messageSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user`,{
                    headers:{
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                });
                // store
                // console.log("other users -> ",res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        const fetchOpenForum = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/messages/openform`,{
                    headers:{
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                });
                // store
                console.log(res)
               dispatch(setOpenMessages(res.data.openChatmessages))
            } catch (error) {
                console.log(error);
            }
        }
        fetchOpenForum();
        fetchOtherUsers();
    }, [])

}

export default useGetOtherUsers