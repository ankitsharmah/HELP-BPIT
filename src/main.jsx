import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';

import App from './App.jsx';
import './index.css';
// import './app.css'
import store from './redux/store.js';
import Header from './shared/Header.jsx';
import { setIseServerLoading } from './redux/messageSlice.js';
// import { setIseServerLoading } from './redux/slices/messageSlice'; // Assuming the action is defined in your redux slices

// export const BASE_URL = "https://help-bipit-api-zkbh.onrender.com";
export const BASE_URL = "http://localhost:9191";

const RootComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isServerStarting } = useSelector((store) => store.message);

  useEffect(() => {
    const loader = async () => {
      try {
        if (isServerStarting) {
          const res = await axios.get(BASE_URL);
          if (res.data.success) {
            dispatch(setIseServerLoading(false));
          }
        }
      } catch (error) {
        console.error("Error starting the server:", error);
      }
    };

    loader();
  }, [isServerStarting]);

  return (
    <div className="relative bg-[#121926] max-w-7xl mx-auto">
      {isServerStarting && (
        <div className="h-[100vh] z-50 top-0 left-0 fixed w-full bg-gray-600/80 flex items-center justify-center text-red-600">
          <div className="h-20 w-72 md:w-80 flex items-center justify-center rounded outline outline-[#43ff49]">
            <p className="text-[#43ff49] font-bold text-xl animate-bounce">
              Please wait, server is starting
            </p>
          </div>
        </div>
      )}
      <Header />
      <div className="overflow-hidden h-fit">
        <App />
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RootComponent />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
