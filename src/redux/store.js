import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import lostAndFound from "./lostAndFound.js";
// persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:{
      user:userReducer,
    message:messageReducer,
    socket:socketReducer,
    reports:lostAndFound
    }
});
export default store;
