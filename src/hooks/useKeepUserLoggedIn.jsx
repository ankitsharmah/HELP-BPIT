import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import axios from "axios";
import { BASE_URL } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import useGetReports from "./useGetReports";


function useKeepUserLoggedIn(navigate) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
// 
  useEffect(() => {
    const loadUserFromStorage = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/api/v1/user/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.valid) {
            dispatch(setAuthUser(response.data.user));
            console.log("veriffyeeddddd")
            // useGetReports();
            console.log("called")
            // navigate("/")
          } else {
            // localStorage.removeItem('token');
            // navigate("/login");
          }
        } catch (error) {
          console.error("Token verification failed", error);
          // localStorage.removeItem('token');
          // navigate("/login");
        }
      }
    };

    loadUserFromStorage();
  }, [dispatch, navigate]);
}

export default useKeepUserLoggedIn;
