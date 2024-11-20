import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { FaHandshakeAngle } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import useKeepUserLoggedIn from '../hooks/useKeepUserLoggedIn';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    // useKeepUserLoggedIn(navigate);

    const [isOpen, setOpen] = useState(false)
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   const loadUserFromStorage = async () => {
    //     const token = localStorage.getItem('authToken');
    //     const storedUser = localStorage.getItem('authUser');
  
    //     if (token && storedUser) {
    //       try {
    //         // Optionally verify token with an API call
    //         const response = await axios.get('/api/auth/verify', {
    //           headers: { Authorization: `Bearer ${token}` },
    //         });
  
    //         if (response.data.valid) {
    //           dispatch(setAuthUser(JSON.parse(storedUser)));
    //         } else {
    //           localStorage.removeItem('authToken');
    //           localStorage.removeItem('authUser');
    //         }
    //       } catch (error) {
    //         console.error('Failed to verify token', error);
    //         localStorage.removeItem('authToken');
    //         localStorage.removeItem('authUser');
    //       }
    //     }
    //   };
  
    //   loadUserFromStorage();
    // }, [dispatch]);
    return (
        <div className="bg-white/30 backdrop-blur-md shadow-md border-b border-white/20 sticky top-0 z-30 rounded-tl-md rounded-tr-md p-2 flex justify-between items-center">
            <div className="flex gap-2 items-center cursor-pointer justify-center w-44" onClick={()=>{
                navigate("/")
            }}>
                <FaHandshakeAngle className="text-[2.8rem] text-white" />
                <span className="md:text-xl  font-bold text-white">HELP-BPIT</span>
            </div>

            <div className='none'>
            <div className='md:hidden'>

<Hamburger toggled={isOpen} toggle={setOpen} color='white' className="md:hidden" />
            </div>

                <ul className="md:flex hidden text-sm md:text-[1.2rem] text-white gap-3">
                    <li className="hover:underline  hover:decoration-black cursor-pointer">Home</li>
                    <li className="hover:underline hover:decoration-black cursor-pointer">Open Forum</li>
                    <li className="hover:underline hover:decoration-black cursor-pointer">Lost & Found</li>
                    <li className="hover:underline hover:decoration-black cursor-pointer">Profile</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
