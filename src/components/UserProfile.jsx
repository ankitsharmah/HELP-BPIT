import React from "react";

const UserProfile = () => {
    const user = {
        _id: "6708039296e4e64b8cc0a650",
        fullname: "Ankit Sharma",
        nickName: "bikkuu",
        email: "a@gmail.com",
        profilePic: "https://avatar.iran.liara.run/username?username=bikkuu",
        gender: "male",
        friends: [],
        createdAt: "2024-10-10T16:40:50.120Z",
        updatedAt: "2024-11-22T17:29:09.399Z",
        reports: [
          {
            _id: "6740a399e5c73b1e17e6a056",
            itemType: "Laptop",
            location: "Library, Second Floor",
            specification: "Dell Inspiron 15, Black, Serial No: AB123456",
            category: "Electronics",
            foundOn: "2024-11-20",
            reportStatus: "FOUND",
            reportedBy: "6708039296e4e64b8cc0a650",
            createdAt: "2024-11-22T15:30:33.831Z",
            updatedAt: "2024-11-22T15:30:33.831Z",
            __v: 0,
          },
          {
            _id: "6740bf659b64f27c50f65142",
            itemType: "Laptop",
            location: "Library, Second Floor",
            specification: "Dell Inspiron 15, Black, Serial No: AB123456",
            category: "Electronics",
            foundOn: "2024-11-20",
            reportStatus: "LOST",
            reportedBy: "6708039296e4e64b8cc0a650",
            createdAt: "2024-11-22T17:29:09.245Z",
            updatedAt: "2024-11-22T17:29:09.245Z",
            __v: 0,
          },
          {
            _id: "6740a399e5c73b1e17e6a056",
            itemType: "Laptop",
            location: "Library, Second Floor",
            specification: "Dell Inspiron 15, Black, Serial No: AB123456",
            category: "Electronics",
            foundOn: "2024-11-20",
            reportStatus: "FOUND",
            reportedBy: "6708039296e4e64b8cc0a650",
            createdAt: "2024-11-22T15:30:33.831Z",
            updatedAt: "2024-11-22T15:30:33.831Z",
            __v: 0,
          },
          {
            _id: "6740bf659b64f27c50f65142",
            itemType: "Laptop",
            location: "Library, Second Floor",
            specification: "Dell Inspiron 15, Black, Serial No: AB123456",
            category: "Electronics",
            foundOn: "2024-11-20",
            reportStatus: "FOUND",
            reportedBy: "6708039296e4e64b8cc0a650",
            createdAt: "2024-11-22T17:29:09.245Z",
            updatedAt: "2024-11-22T17:29:09.245Z",
            __v: 0,
          },
          {
            _id: "6740a399e5c73b1e17e6a056",
            itemType: "Laptop",
            location: "Library, Second Floor",
            specification: "Dell Inspiron 15, Black, Serial No: AB123456",
            category: "Electronics",
            foundOn: "2024-11-20",
            reportStatus: "FOUND",
            reportedBy: "6708039296e4e64b8cc0a650",
            createdAt: "2024-11-22T15:30:33.831Z",
            updatedAt: "2024-11-22T15:30:33.831Z",
            __v: 0,
          },
          {
            _id: "6740bf659b64f27c50f65142",
            itemType: "Laptop",
            location: "Library, Second Floor",
            specification: "Dell Inspiron 15, Black, Serial No: AB123456",
            category: "Electronics",
            foundOn: "2024-11-20",
            reportStatus: "FOUND",
            reportedBy: "6708039296e4e64b8cc0a650",
            createdAt: "2024-11-22T17:29:09.245Z",
            updatedAt: "2024-11-22T17:29:09.245Z",
            __v: 0,
          },
        ],
      }
      const foundItems = user.reports.filter(
        (report) => report.reportStatus === "FOUND"
      );
      const lostItems = user.reports.filter(
        (report) => report.reportStatus === "LOST"
      );
    
      return (
        <div className="bg-black min-h-screen text-white p-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info Section */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-6">
              <div className="text-center">
                <img
                  src={user.profilePic}
                  alt={user.nickName}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-gray-700"
                />
                <h1 className="text-2xl font-bold mt-4">{user.fullname}</h1>
                <p className="text-gray-400">@{user.nickName}</p>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
    
            {/* Friends Section */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 col-span-1 md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Friends</h2>
              {user.friends && user.friends.length > 0 ? (
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {user.friends.map((friend, index) => (
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
            <h2 className="text-2xl font-bold mb-4">Your Reported Items</h2>
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
                          <span className="font-semibold">Specification:</span>{" "}
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
                          <span className="font-semibold">Specification:</span>{" "}
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
      );
    };
    
    export default UserProfile;