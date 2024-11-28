import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../main';
import { setLoadingReports, setReports } from '../redux/lostAndFound';

const useGetReports = () => {

        const dispatch = useDispatch();
        const {authUser} = useSelector(store=>store.user);

        useEffect(()=>{

         async function getReports(){
            dispatch(setLoadingReports(true))
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/reports`)
                console.log("this is reports from backend ",res)
                if (res.data.success){
                    dispatch(setReports(res.data.reports))
                }
               } catch (error) {
                console.log(error)
               }
               finally{
                dispatch(setLoadingReports(false))

               }
         }
         getReports()
        },[authUser])
}

export default useGetReports
