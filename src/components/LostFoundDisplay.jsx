

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../app.css"
// import { BiRightArrowCircle } from "react-icons/bi";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// export function LostFoundDisplay() {
//   const navigate = useNavigate();
//   const items = dummyReports;

//   return (
//     <div className="  bg-red overflow-x-scroll flex gap-2">
//       {items.map((item, idx) => (
//         <div
//           key={idx}
//           className=" rounded-2xl bg-cyan-4 min-w-[12rem] md:w-[30%] text-xs cursor-pointer bg-white/10 border-[.2px] px-2 py-3"
//           onClick={() => {
//             console.log(`Clicked item ${idx}`);
//             navigate(`/item/${idx}`);
//           }}
//         >
//           <span className="relative  text-2xl font-bold text-white">
//             {item.itemType}
//           </span>
//           <div className="relative z-20 mt-1 text-xs flex flex-col items-start">
//             <p className="text-[0.8rem] text-white">
//               <span className="font-semibold">Location:</span> {item.location}
//             </p>
           
//             <p className="text-sm text-white">
//               <span className="font-semibold">Found On:</span> {item.foundOn}
//             </p>
//             <p className="text-sm text-white">
//               <span className="font-semibold">Status:</span>
//               <span className="text-red-500 pl-1 font-extrabold">
//                 {item.reportStatus}
//               </span>
//             </p>
//             <p className="text-sm hidden text-white">
//               <span className="font-semibold">Reported By:</span>{" "}
//               {item.reportedBy}
//             </p>
//           </div>
//         </div>
//       ))}
//       <NavLink to={"/open-forum"} className={"text-white  flex items-center justify-center px-2  "}><MdKeyboardDoubleArrowRight  className="text-5xl font-semibold"/></NavLink>
//     </div>
//   );
// }

// export const dummyReports = [
//   {
//     itemType: "Laptop",
//     location: "Library, Second Floor",
//     specification: "Dell Inspiron 15, Black, Serial No: AB123456",
//     category: "Electronics",
//     foundOn: "2024-11-20",
//     reportStatus: "FOUND",
//     reportedBy: {
//       fullname: "Ankit Sharma",
//       nickName: "bikkuu",
//       email: "a@gmail.com",
//       profilePic: "https://avatar.iran.liara.run/username?username=bikkuu",
//       gender: "male",
//       createdAt: "2024-10-10T16:40:50.120Z",
//       updatedAt: "2024-11-22T17:29:09.399Z",
//     },
//   },
//   {
//     itemType: "Laptop",
//     location: "Library, Second Floor",
//     specification: "Dell Inspiron 15, Black, Serial No: AB123456",
//     category: "Electronics",
//     foundOn: "2024-11-20",
//     reportStatus: "FOUND",
//     reportedBy: {
//       fullname: "Ankit Sharma",
//       nickName: "bikkuu",
//       email: "a@gmail.com",
//       profilePic: "https://avatar.iran.liara.run/username?username=bikkuu",
//       gender: "male",
//       createdAt: "2024-10-10T16:40:50.120Z",
//       updatedAt: "2024-11-22T17:29:09.399Z",
//     },
//   },
//   {
//     itemType: "Laptop",
//     location: "Library, Second Floor",
//     specification: "Dell Inspiron 15, Black, Serial No: AB123456",
//     category: "Electronics",
//     foundOn: "2024-11-20",
//     reportStatus: "FOUND",
//     reportedBy: {
//       fullname: "Ankit Sharma",
//       nickName: "bikkuu",
//       email: "a@gmail.com",
//       profilePic: "https://avatar.iran.liara.run/username?username=bikkuu",
//       gender: "male",
//       createdAt: "2024-10-10T16:40:50.120Z",
//       updatedAt: "2024-11-22T17:29:09.399Z",
//     },
//   },
//   {
//     itemType: "Laptop",
//     location: "Library, Second Floor",
//     specification: "Dell Inspiron 15, Black, Serial No: AB123456",
//     category: "Electronics",
//     foundOn: "2024-11-20",
//     reportStatus: "FOUND",
//     reportedBy: {
//       fullname: "Ankit Sharma",
//       nickName: "bikkuu",
//       email: "a@gmail.com",
//       profilePic: "https://avatar.iran.liara.run/username?username=bikkuu",
//       gender: "male",
//       createdAt: "2024-10-10T16:40:50.120Z",
//       updatedAt: "2024-11-22T17:29:09.399Z",
//     },
//   },

// ];


import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import "../App.css";
import { useSelector } from "react-redux";
import useGetReports from "../hooks/useGetReports";

export function LostFoundDisplay() {
  // useGetReports();
  const navigate = useNavigate();
  const {allReports,isLoadingReports} = useSelector(store=>store.reports)
  const items = allReports.slice(3,8 );

  return (
    <div className=" h-full overflow-x-scroll containerr">
      <div className="containerr  mx-auto ">
       
        <div className={isLoadingReports ?"":"flex items-center overflow-x-scroll containerr gap-4 pb-2"}>
        {
          isLoadingReports ? <>
          {/* <div className=" items-center justify-center hidden md:flex">
            <p>
              Loading...
            </p>
          </div> */}
         
          <div className="  flex animate-pulse  gap-2">
              {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className=" bg-gray-300 h-[150px] ml-2 rounded-md min-w-44 "
                  ></div>
                ))}
             
          </div>
          </>:<>
          {items.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[12rem] md:w-[30%] min-h-[9.5rem]  bg-[#18192f] text-white rounded-2xl p-2 cursor-pointer border-[.2px] border-white hover:bg-opacity-20 transform transition duration-300"
              onClick={() => {
                navigate(`/item/${item._id}`);
              }}
            >
              <div className="text-center mb-3">
                <span className="text-2xl font-bold">{item.itemType}</span>
              </div>
              <div className="flex flex-col ">
                <p className="text-sm">
                  <span className="font-semibold">Location:</span> {item.location}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Found On:</span> {item.foundOn}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-extrabold ${
                      item.reportStatus === "FOUND" ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {item.reportStatus}
                  </span>
                </p>
              </div>
            </div>
          ))}

          {
            isLoadingReports ? <></>:  <NavLink
          to="/lost-found"
          className="flex items-center justify-center bg-transparent text-white  border-white rounded-full shadow-md hover:bg-white hover:text-black transition duration-300"
        >
          <MdKeyboardDoubleArrowRight className="text-2xl font-semibold mr-2" />

        </NavLink>
          }
        
          </>
        }
        </div>

       
      </div>
    </div>
  );
}

