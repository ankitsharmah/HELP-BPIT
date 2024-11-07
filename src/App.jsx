// import { useEffect, useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import io from "socket.io-client";  // Import Socket.IO client
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import HomePage from "./components/HomePage";
// import { BASE_URL } from "./main";
// import { useDispatch, useSelector } from "react-redux";
// import { setOnlineUsers } from "./redux/userSlice";
// import { setSocket } from "./redux/socketSlice";


  
//   function App() { 
//     // console.log('Rendering App Component');

//     const {authUser} = useSelector(store=>store.user);
//     const {socket} = useSelector(store=>store.socket);
//     const dispatch = useDispatch();
  
//     useEffect(()=>{
//       if(authUser){
//         const socketio = io(`${BASE_URL}`, {
//             query:{
//               userId:authUser.user._id
//             }
//         });
//         dispatch(setSocket(socketio));
  
//         socketio?.on('getOnlineUsers', (onlineUsers)=>{
//           dispatch(setOnlineUsers(onlineUsers))
//         });
//         return () => socketio.close();
//       }else{
//         if(socket){
//           socket.close();
//           dispatch(setSocket(null));
//         }
//       }
  
//     },[authUser]);
  

//   return (
//    <BrowserRouter>
//     <Routes>
//       <Route path="/login" element={<Login />}/>
//       <Route path="/signup" element={<Signup />}/>
//       <Route path="/" element={<HomePage />}/>
//     </Routes>
//    </BrowserRouter>
//   );
// }

// export default App;



import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import { BASE_URL } from "./main";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers, setTyping } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";
import { setMessages, setOpenMessages } from "./redux/messageSlice";
import MessageContainer from "./components/MessageContainer";
import OpenChatForum from "./components/OpenChatForum";

function App() {
    const { authUser } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {
            const socketio = io(`${BASE_URL}`, {
                query: { userId: authUser.user._id }
            });
            dispatch(setSocket(socketio));

            // Listen for online users
            socketio.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });
            socketio.on("typing", (data) => {
                // Handle typing status change for a particular user
                const { senderId, typing } = data;
                console.log("typing in jsx ",typing)
                dispatch(setTyping(typing));
            });

           

            // Cleanup on unmount
            return () => {
                socketio.off("getOnlineUsers");
                socketio.off("typing");
                socketio.off("newPrivateMessage");
                socketio.off("openChatMessage");
                socketio.close();
            };
        } else {
            if (socket) {
                socket.close();
                dispatch(setSocket(null));
            }
        }
    }, [authUser, dispatch,authUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/one-to-one" element={<MessageContainer />} />
                <Route path="/open-chat" element={<OpenChatForum />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
