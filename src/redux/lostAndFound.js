import { createSlice } from "@reduxjs/toolkit";


const lostAndFound = createSlice({
    name:"lostAndFound",
    initialState:{
        allReports:[],
        isLoadingReports:false
    },
    reducers:{
         setReports(store,action){
            // console.log(action.payload)
                store.allReports=action.payload;
                store.isLoadingReports=false;
        },
        setLoadingReports(store,action){
            store.isLoadingReports=action.payload;
        }
    }
})

export const {setReports,setLoadingReports} =lostAndFound.actions

export default lostAndFound.reducer