import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:[],
        isLoading:false,
        openChats:null
    },
    reducers:{
        setMessages:(state,action)=>{
            state.isLoading = true;
            state.messages = action.payload;

        },
        setOpenMessages:(state,action)=>{
            state.openChats = action.payload;
        }
        ,
        setIsLoading:(state,action)=>{
            console.log("payload is  " , action.payload);
            state.isLoading = action.payload;
        }
    }
});
export const {setMessages,setOpenMessages,setIsLoading} = messageSlice.actions;
export default messageSlice.reducer;