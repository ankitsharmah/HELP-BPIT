import { createSlice } from "@reduxjs/toolkit";


const lostAndFound = createSlice({
    name:"lostAndFound",
    initialState:{
        allReports:[],
        isLoadingReports:false,
        filterData:{
            category:null,
            date:null,
            status:null
        }
    },
    reducers:{
         setReports(store,action){
            // console.log(action.payload)
                store.allReports=action.payload;
                store.isLoadingReports=false;
        },
        setLoadingReports(store,action){
                store.isLoadingReports=action.payload;
        },
        setFilterdata(store,action){
            const {type,val} =action.payload
            console.log(action.payload)
            if(type==="category"){
                if(val=="Others" || val==""){
                    store.filterData.category="";
                }else{
                store.filterData.category=val

                }
            }else if(type==="date"){
                store.filterData.date=val
            }else{
                store.filterData.status=val
            }

        },
        setAllFilterData(store){
            console.log("im alled to set all")
            store.filterData.category="";
            store.filterData.date="";
            store.filterData.status=""


        }
    }
})

export const {setReports,setLoadingReports,setFilterdata,setAllFilterData} =lostAndFound.actions

export default lostAndFound.reducer