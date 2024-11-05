import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:[],
        openChats:null
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        setOpenMessages:(state,action)=>{
            state.openChats = action.payload;
        }
    }
});
export const {setMessages,setOpenMessages} = messageSlice.actions;
export default messageSlice.reducer;