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

    return (
        <div className="bg-[#1E2A38] text-white  shadow-lg border-b border-white/20 sticky  top-0 z-30  rounded-tl-md rounded-tr-md p-2 h-fit flex justify-between items-center m">
            <div className="flex gap-2 ml-2 items-center cursor-pointer justify-between " onClick={()=>{
                navigate("/")
            }}>
                <FaHandshakeAngle className="text-[2.8rem] text-white" />
                <span className="md:text-xl  font-bold text-white">HELP-BPIT</span>
            </div>

            <div className='h-fit'>

            <div className='overflow-x-hidden mr-2 realtive md:hidden'>

            <Hamburger toggled={isOpen} toggle={setOpen} color="white" className="md:hidden mr-1" />
  {
    <div className={!isOpen ? "h-fit hidden left-0 top-0 duration-300 p-2 absolute bg-gray-500 " : "bg-gray-600 h-fit right-0 top-16  duration-300 p-2 absolute"}>
      <div className="h-5 w-5 bg-gray-600 -translate-y-2 absolute right-[1.85rem] rotate-45 -z-10 top-0"></div>
      {
        isLoggedin ? (
          <div className="flex flex-col p-2">
            <NavLink 
              to={"/"} 
              className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-500 hover:scale-105 transition-all duration-300 hover:shadow-md cursor-pointer mb-2"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to={"/profile"} 
              className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-500 hover:scale-105 transition-all duration-300 hover:shadow-md cursor-pointer" 
              onClick={() => setOpen(false)}
            >
              Profile
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col">
            <NavLink 
              to={"/"} 
              className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-500 hover:scale-105 transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to={"/login"} 
              className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-500 hover:scale-105 transition-all duration-300 hover:shadow-md cursor-pointer mt-2"
              onClick={() => setOpen(false)}
            >
              Sign In
            </NavLink>
            <NavLink 
              to={"/signup"} 
              className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-500 hover:scale-105 transition-all duration-300 hover:shadow-md cursor-pointer mt-2"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        )
      }
    </div>
  }
                    

            </div>

                <ul className="md:flex hidden h-fit text-sm md:text-[1.2rem] text-white gap-3">
                
                    <li className="hover:underline  hover:decoration-black cursor-pointer"><NavLink to={"/"}> 
                Home
                </NavLink></li>
                    <li className="hover:underline hover:decoration-black cursor-pointer" onClick={()=>{
                      navigate("/open-forum")
                    }}>Open Forum</li>
                    <li className="hover:underline hover:decoration-black cursor-pointer" onClick={()=>{
                      navigate("/lost-found")
                    }}>Lost & Found</li>
                    {
                        isLoggedin ? <NavLink to={"/profile" } className={"hover:underline  hover:decoration-black cursor-pointer"} onClick={()=>setOpen(false)}>Profile</NavLink>:<div>
                            <NavLink to={"/login"} className={"mr-1 "}>sign in</NavLink>
                            <NavLink to={"/signup"}>sign up</NavLink>
                          
                        </div>
                    }
                    
                </ul>
            </div>
        </div>
    );
};

export default Header;
