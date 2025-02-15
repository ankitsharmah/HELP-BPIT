import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setIsloggedin } from "../redux/userSlice";
// import { addFriend } from "../redux/friendsSlice"; // Make sure to implement addFriend action in your redux slice.

const UserProfile = () => {
  const dispatch = useDispatch();
  const { allReports } = useSelector((store) => store.reports);
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(false); // Track if the user is a friend

  // Function to handle adding a friend
  const handleAddFriend = () => {
    // Dispatch action to add the friend (ensure the addFriend logic is in your Redux)
    dispatch(addFriend(authUser._id)); // Pass the logged-in user ID to add a friend
    setIsFriend(true); // Mark as friend after action
  };

  // Logic to check if the user is already a friend
  const isAlreadyFriend = authUser?.friends?.includes(authUser._id);

  const foundItems = allReports
    ? allReports.filter(
        (report) =>
          report.reportStatus === "FOUND" &&
          authUser?._id === report.reportedBy?._id
      )
    : [];

  const lostItems = allReports
    ? allReports.filter(
        (report) =>
          report.reportStatus === "LOST" &&
          authUser?._id === report.reportedBy?._id
      )
    : [];

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {!authUser || !allReports ? (
        <div className="animate-pulse">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Loading User Info Section */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto bg-gray-700"></div>
                <div className="h-6 bg-gray-700 mt-4 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-700 mt-2 rounded w-1/3 mx-auto"></div>
                <div className="h-4 bg-gray-700 mt-2 rounded w-2/3 mx-auto"></div>
                <div className="h-4 bg-gray-700 mt-2 rounded w-1/3 mx-auto"></div>
              </div>
            </div>

            {/* Loading Friends Section */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 col-span-1 md:col-span-2">
              <div className="h-6 bg-gray-700 mb-4 rounded w-1/4"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="h-16 bg-gray-700 rounded-md"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Reported Items Section */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 mt-8">
            <div className="h-6 bg-gray-700 mb-4 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-6 bg-gray-700 mb-2 rounded w-1/3"></div>
                <div className="h-96 overflow-y-scroll bg-gray-800 p-4 rounded-md">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-4 rounded-md shadow-md mb-4 h-20"
                    ></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-6 bg-gray-700 mb-2 rounded w-1/3"></div>
                <div className="h-96 overflow-y-scroll bg-gray-800 p-4 rounded-md">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-4 rounded-md shadow-md mb-4 h-20"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Normal content goes here */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info Section */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-6">
              <div className="text-center">
                <img
                  src={authUser.profilePic}
                  alt={authUser.nickName}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-gray-700"
                />
                <h1 className="text-2xl font-bold mt-4">{authUser.fullname}</h1>
                <p className="text-gray-400">@{authUser.nickName}</p>
                <p className="text-gray-300">{authUser.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Member since:{" "}
                  {new Date(authUser.createdAt).toLocaleDateString()}
                </p>

                {/* Add Friend Button or Already Friend */}
                {isAlreadyFriend ? (
                  <button
                    className="mt-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md"
                    disabled
                  >
                    Already Friend
                  </button>
                ) : (
                  <button
                    onClick={handleAddFriend}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
                  >
                    Add Friend
                  </button>
                )}
              </div>
            </div>

            {/* Friends Section */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 col-span-1 md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Friends</h2>
              {authUser.friends && authUser.friends.length > 0 ? (
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {authUser.friends.map((friend, index) => (
                    <li
                      key={index}
                      className="bg-gray-800 p-4 rounded-md shadow-md text-center"
                    >
                      <p className="font-semibold">{friend}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">You have no friends yet.</p>
              )}
            </div>
          </div>

          {/* Reported Items Section */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">{authUser.fullname} Reported Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Found Section */}
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  Found Items
                </h3>
                <div className="h-96 overflow-y-scroll bg-gray-800 p-4 rounded-md">
                  {foundItems.length > 0 ? (
                    foundItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-gray-700 p-4 rounded-md shadow-md mb-4"
                      >
                        <p>
                          <span className="font-semibold">Item Type:</span>{" "}
                          {item.itemType}
                        </p>
                        <p>
                          <span className="font-semibold">Location:</span>{" "}
                          {item.location}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Specification:
                          </span>{" "}
                          {item.specification}
                        </p>
                        <p>
                          <span className="font-semibold">Found On:</span>{" "}
                          {new Date(item.foundOn).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No found items reported.</p>
                  )}
                </div>
              </div>

              {/* Lost Section */}
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  Lost Items
                </h3>
                <div className="h-96 overflow-y-scroll bg-gray-800 p-4 rounded-md">
                  {lostItems.length > 0 ? (
                    lostItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-gray-700 p-4 rounded-md shadow-md mb-4"
                      >
                        <p>
                          <span className="font-semibold">Item Type:</span>{" "}
                          {item.itemType}
                        </p>
                        <p>
                          <span className="font-semibold">Location:</span>{" "}
                          {item.location}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Specification:
                          </span>{" "}
                          {item.specification}
                        </p>
                        <p>
                          <span className="font-semibold">Lost On:</span>{" "}
                          {new Date(item.foundOn).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No lost items reported.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
