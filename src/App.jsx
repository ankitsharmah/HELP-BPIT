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
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";
import { setMessages, setOpenMessages } from "./redux/messageSlice";

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

            // Listen for one-to-one messages
            // socketio.on("newPrivateMessage", (newMessage) => {
            //   console.log("private ",newMessage)

            //     dispatch(setMessages((prevMessages) => [...prevMessages, newMessage]));
            // });

            // Listen for open chat messages
            // socketio.on("openChatMessage", (newOpenMessage) => {
            //   console.log("open chat message",newOpenMessage)
            //     dispatch(setOpenMessages((prevOpenMessages) => [...prevOpenMessages, newOpenMessage]));
            // });

            // Cleanup on unmount
            return () => {
                socketio.off("getOnlineUsers");
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
    }, [authUser, dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
