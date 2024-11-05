import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
// persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:{
      user:userReducer,
    message:messageReducer,
    socket:socketReducer
    }
});
export default store;
