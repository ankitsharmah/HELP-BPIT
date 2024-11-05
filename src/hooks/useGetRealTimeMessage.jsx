// import { useEffect } from "react";
// import {useSelector, useDispatch} from "react-redux";
// import { setMessages, setOpenMessages } from "../redux/messageSlice";

// const useGetRealTimeMessage = () => {
//     const {socket} = useSelector(store=>store.socket);
//     const {messages,openChats} = useSelector(store=>store.message);
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         socket?.on("newPrivateMessage", (newMessage)=>{
            
//             console.log("realtime message ",newMessage)
//             dispatch(setMessages([...messages, newMessage]));
//         });
//         socket?.on("openChatMessage", (msg)=>{
            
//             console.log("realtime message ",msg)
//             const upmsgs = [...openChats?.messages, msg]
//             const updatedOpenChats = {...openChats ,messages:upmsgs}
//             dispatch(setOpenMessages(updatedOpenChats));
//         });

//         return () =>{ socket?.off("newPrivateMessage");
//             socket?.off("openChatMessage")
//         };
//     },[setMessages, messages]);
// };
// export default useGetRealTimeMessage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setOpenMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages, openChats } = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket) {
            // Private message listener
            // socket.on("newPrivateMessage", (newMessage) => {
            //     console.log("this is old msgs ",messages);
            //     console.log("new msg is ",newMessage)
            //     dispatch(setMessages([...messages, newMessage]));
            //     console.log("on proivate", messages)
            // });
            socket?.on("newPrivateMessage", (newMessage) => {
                // console.log("real-time message received");
                
                // Dispatch using a function to access the latest state
                const updatedMessage = [...messages,newMessage];
                console.log("real ",updatedMessage)
                dispatch(setMessages(updatedMessage));
            });
            
            

            // Open chat message listener
            socket?.on("openChatMessage", (msg) => {
                const updatedOpenChats = {
                    ...openChats,
                    messages: [...openChats?.messages, msg]
                };
                console.log("real open",updatedOpenChats)

                dispatch(setOpenMessages(updatedOpenChats));
            });

            // Cleanup listeners on unmount or when socket changes
            return () => {
                socket.off("newPrivateMessage");
                socket.off("openChatMessage");
            };
        }
    }, [socket, dispatch, openChats,messages]);
};

export default useGetRealTimeMessage;
