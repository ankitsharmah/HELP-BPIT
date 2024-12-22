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
import { setAuthUser, setOnlineUsers, setTyping } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";
import { setMessages, setOpenMessages } from "./redux/messageSlice";
import MessageContainer from "./components/MessageContainer";
import OpenChatForum from "./components/OpenChatForum";
import Header from "./shared/Header";
import Footer from "./shared/Footer"
import axios from "axios";
import useKeepUserLoggedIn from "./hooks/useKeepUserLoggedIn";
import LostAndFound from "./components/LostAndFound";
import UserProfile from "./components/UserProfile";
import LostAndFoundReport from "./components/LostAndFooundReport";
import useGetReports from "./hooks/useGetReports";
import Profile from "./components/Profile";
function App() {
    useKeepUserLoggedIn();
    useGetReports();
    console.log("app.jsx mounted")
    const { authUser } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {
            const socketio = io(`${BASE_URL}`, {
                query: { userId: authUser._id }
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
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/u/:id" element={<UserProfile />} />
                <Route path="/one-to-one" element={<MessageContainer />} />
                <Route path="/open-forum" element={<OpenChatForum />} />
                <Route path="/item/:id" element={<LostAndFound />} />
                <Route path="/lost-found" element={<LostAndFoundReport />} />
            </Routes>
    );
}

export default App;
