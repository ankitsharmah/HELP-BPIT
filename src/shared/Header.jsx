import Hamburger from 'hamburger-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { FaHandshakeAngle } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import useKeepUserLoggedIn from '../hooks/useKeepUserLoggedIn';
import { NavLink, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Header = () => {

    const navigate = useNavigate();
    // useKeepUserLoggedIn(navigate);

    const [isOpen, setOpen] = useState(false)
    const {isLoggedin} =useSelector(store=>store.user)
    const dropdownRef = useRef(null);

    // Use the custom hook to handle clicks outside the dropdown
    // useOnClickOutside(dropdownRef, () => setOpen(false));
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
        <div className="bg-[#1E2A38] text-white  shadow-lg border-b border-white/20 sticky  top-0 z-30  rounded-tl-md rounded-tr-md p-2 h-fit flex justify-between items-center">
            <div className="flex gap-2 items-center cursor-pointer justify-center w-44" onClick={()=>{
                navigate("/")
            }}>
                <FaHandshakeAngle className="text-[2.8rem] text-white" />
                <span className="md:text-xl  font-bold text-white">HELP-BPIT</span>
            </div>

            <div className='h-fit'>
            <div className='overflow-x-hidden realtive md:hidden'>

                <Hamburger toggled={isOpen} toggle={setOpen} color='white' className="md:hidden" />
          {
           <div className={!isOpen?"translate-x-16 hidden transition-transform duration-300 w-36 absolute bg-gray-200 ":"-translate-x-[5.6rem]  transition-transform duration-300 w-36 absolute  bg-gray-200 "}>
            {
                        isLoggedin ? <NavLink to={"/profile" } className={"hover:underline  hover:decoration-black cursor-pointer"} onClick={()=>setOpen(false)}>Profile</NavLink>:<div>
                            <NavLink to={"/login"} 
                            onClick={()=>setOpen(false)}>sign in</NavLink>
                            <NavLink to={"/signup"}
                            onClick={()=>setOpen(false)}>sign up</NavLink>
                          
                        </div>
                    }
            </div>
          }
                    

            </div>

                <ul className="md:flex hidden h-fit text-sm md:text-[1.2rem] text-white gap-3">
                
                    <li className="hover:underline  hover:decoration-black cursor-pointer"><NavLink to={"/"}> 
                Home
                </NavLink></li>
                    <li className="hover:underline hover:decoration-black cursor-pointer">Open Forum</li>
                    <li className="hover:underline hover:decoration-black cursor-pointer">Lost & Found</li>
                    {
                        isLoggedin ? <li className="hover:underline hover:decoration-black cursor-pointer">Profile</li>:<div>
                            <NavLink to={"/login"}>sign in</NavLink>
                            <NavLink to={"/signup"}>sign up</NavLink>
                          
                        </div>
                    }
                    
                </ul>
            </div>
        </div>
    );
};

export default Header;
