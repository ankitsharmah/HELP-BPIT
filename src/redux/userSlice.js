import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        isTyping: false,
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        onlineUsers:null,
        selectedOpenForum:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        
        setTyping:(state,action)=>{
            state.isTyping = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        setSelectedOpenForum:(state,action)=>{
            console.log("called " ,action.payload )
            state.selectedOpenForum = action.payload;
        
    }
        },
      
});
export const {setAuthUser,setOtherUsers,setTyping,setSelectedUser,setOnlineUsers,setSelectedOpenForum} = userSlice.actions;
export default userSlice.reducer;