import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";
import OpenForum from './OpenForum';


const OtherUsers = () => {
    // my custom hook
    // useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user);
    const {authUser} = useSelector(store=>store.user);
    const {openChats} = useSelector(store=>store.message)
    if (!otherUsers) return; // early return in react
     
    return (
        <div className='overflow-auto md:flex-1 flex-auto'>
                <OpenForum key={openChats?._id} user={openChats}/>
            {
                otherUsers?.map((user)=>{
                    return (
                        <>
                           
                            <div>
                                {
                       user._id !== authUser.user._id && <OtherUser key={user._id} user={user}/>

                                }
                            </div>
                        </>
                    )
                })
            }
            
        </div>
    )
}

export default OtherUsers