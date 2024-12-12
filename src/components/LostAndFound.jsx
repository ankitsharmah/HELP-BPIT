import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetReports from "../hooks/useGetReports";
import axios from "axios";
import { BASE_URL } from "../main";
import { setIsLoading } from "../redux/messageSlice";

const LostAndFound = () => {
  const { id } = useParams(); // Extract the ID from the URL
  // useGetReports();
  const [item, setItem] = useState(null); // Initialize item as null to handle async fetching
  const { allReports } = useSelector((store) => store.reports);
  const [isLoadingReports,setIsLoading] = useState(true);

  useEffect(() => {
      async  function loadOneRport(){
        setIsLoading(true);
          try {
            const res = await axios.get(`${BASE_URL}/api/v1/reports/${id}`)
console.log(res)
            if(res.data.success){
                setItem(res.data.report)
                console.log("in iffffffffffdfdfsd")
                setIsLoading(false)

            }
          } catch (error) {
            console.log(error)
          }finally{
            setIsLoading(false)
          }
        }
        loadOneRport();
  }, [id]);

  console.log(item)
  if (isLoadingReports) {
    return (
      <div className="h-[88vh] flex flex-col items-center text-white p-6 shadow-lg max-w-md mx-auto border border-gray-700 relative overflow-hidden">
    
            <div className="flex h-fit w-full items-center justify-center flex-col gap-2">

            <div className="outline w-32 outline-[.1px] h-6  rounded-lg bg-[#cfcbcb] "></div>
              <div
              className="w-24 outline-[.1px] h-6  rounded-lg bg-[#cfcbcb]"></div>




            <div className="w-[100%] mt-6 outline-[.1px] h-[27vh]  rounded-lg bg-[#f0efefc9]">

            </div>

            <div className=" outline-[.1px] mt-2 h-[26vh] w-[100%] rounded-lg bg-[#cfcbcb]">

            </div>

          <button className="outline-[.1px] mt-3 h-[5vh] w-32 rounded-lg bg-[#cfcbcb]">

          </button>
         
            </div>


      </div>
    
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Item not found or no data available.</p>
      </div>
    );
  }

  return (
    <div className="h-[88vh] flex flex-col items-center text-white p-6 shadow-lg max-w-md mx-auto border border-gray-700 relative overflow-hidden">
      {/* Header Section */}
      <div className="relative z-10 text-center mb-8">
        <h2 className="text-2xl font-bold">{item.itemType || "Unknown Item"}</h2>
        <p className="text-sm text-gray-400 mt-1">{item.category || "No Category"}</p>
      </div>

      {/* Details Section */}
      <div className="space-y-6">
        {/* Details */}
        <div className="bg-[#222637] p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold mb-4">Details</h3>
          <p className="text-sm">
            <span className="font-medium text-gray-300">Location:</span>{" "}
            {item.location || "Unknown"}
          </p>
          <p className="text-sm">
            <span className="font-medium text-gray-300">Specification:</span>{" "}
            {item.specification || "No Details Provided"}
          </p>
          <p className="text-sm">
            <span className="font-medium text-gray-300">Found On:</span>{" "}
            {item.foundOn || "Unknown Date"}
          </p>
          <p className="text-sm">
            <span className="font-medium text-gray-300">Report Status:</span>{" "}
            <span className="font-bold text-red-400">{item.reportStatus || "Unknown"}</span>
          </p>
        </div>

        {/* Reported By */}
        {item.reportedBy && (
          <div className="bg-[#222637] p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Reported By</h3>
            <div className="flex items-center space-x-4">
              <img
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-600"
                src={item.reportedBy.profilePic || "/placeholder-avatar.png"}
                alt={`${item.reportedBy.nickName || "User"}'s Avatar`}
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{item.reportedBy.fullname || "Anonymous"}</p>
                  <button className="text-sm text-cyan-300/85 self-start">Add Friend</button>
                </div>
                <p className="text-xs text-gray-400">{item.reportedBy.email || "No Email"}</p>
              </div>
            </div>
            <p className="text-sm mt-4">
              <span className="font-medium text-gray-300">Nickname:</span>{" "}
              {item.reportedBy.nickName || "Unknown"}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-300">Gender:</span>{" "}
              {item.reportedBy.gender || "Unknown"}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-300">Contact Info:</span>{" "}
              <a
                href={`tel:${item.contact || ""}`}
                className="text-cyan-300 hover:underline"
              >
                {item.contact || "Not Provided"}
              </a>
            </p>
          </div>
        )}

      </div>
      <NavLink to={"/lost-found"} className={"mt-4 outline px-4 rounded-md py-1 outline-[.1px"}>all Reports</NavLink>
    </div>
  );
};

export default LostAndFound;
