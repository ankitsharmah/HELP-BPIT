import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../main';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
// import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
 
    
    if (!authUser) {
      navigate("/login");
    }
    else{
      navigate("/")
    }
  }, [authUser, navigate]);
  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   console.log(user)
  //   try {
  //     const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     });

  //     localStorage.setItem("token",res.data.auth_token);
  //     navigate("/");
  //     console.log(res);
  //     dispatch(setAuthUser(res.data));
  //   } catch (error) {
  //     // toast.error(error.response.data.message);
  //     console.log(error);
  //   }
  //   setUser({
  //     email: "",
  //     password: ""
  //   })
  // }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Save both the token and user data to localStorage
      localStorage.setItem('token', res.data.auth_token);
      // localStorage.setItem('authUser', JSON.stringify(res.data.user));  // Save user details
  
      // Dispatch user data to Redux
      dispatch(setAuthUser(res.data.user));
  
      // Redirect to home page
      navigate('/');
  
      console.log(res);
    } catch (error) {
      console.log(error);
      // You can use a toast here to show an error message to the user
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  
    // Reset form fields
    setUser({
      email: "",
      password: "",
    });
  };
  
  return (
    <div className="min-w-96 md:w-[40%] h-[81vh] flex items-center  mx-auto">
    
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-800  border border-gray-100'>
        <h1 className='text-3xl font-bold text-white text-center'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2'>
              <span className='text-base text-white label-text'>Username</span>
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base text-white label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Password' />
          </div>
          <p className='text-center my-2'>Don't have an account? <Link to="/signup"> signup </Link></p>
          <div>
            <button type="submit" className='btn btn-block bg-red-600 btn-sm mt-2 border border-red-700'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login