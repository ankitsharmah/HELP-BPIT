import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useGetReports from "../hooks/useGetReports";

const LostAndFoundReport = () => {
  const navigate = useNavigate();
  // useGetReports();
  const [isReporting, setIsReporting] = useState(false);
  const {allReports} = useSelector(store=>store.reports)
  const {isLoadingReports}=useSelector(store=>store.reports)
  console.log(allReports)
  const [formData, setFormData] = useState({
    itemType: "",
    location: "",
    specification: "",
    category: "",
    foundOn: "",
    contact: "",
    reportStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    setIsReporting(false)

    // TODO: Send `formData` to the backend using axios or fetch
  };

  return (
    <div className="relative text-white h-[86vh] md:h-[91vh] p-4 sm:p-6">
      {/* Background content */}
      <div className={`flex h-[85vh]  lg:grid  lg:grid-cols-4 md:gap-4 ${isReporting ? "blur-sm" : ""}`}>
        {/* Sidebar */}
        <aside className="space-y-4 border-r-[1px] pr-3 w-[54%] lg:col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium">Filter by Category</label>
            <select className="w-full bg-black outline outline-[0.1px] text-white rounded-md p-2">
              <option>All</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Filter by Date</label>
            <input type="date" className="w-full bg-black border-[0.1px] text-white rounded-md p-2" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Filter by Status</p>
            <div className="space-y-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="status" className="text-cyan-500" />
                <span>Lost</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="status" className="text-cyan-500" />
                <span>Found</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Reported Items */}
        <section className="space-y-4 px-1  w-full  lg:col-span-3">
          <h2 className="text-lg  font-medium">Reported Items</h2>
          
            {isLoadingReports ?<h1>
      fetching reports...
     </h1> :<>  <div className="space-y-4 w-full h-[65vh] md:h-[460px] outline outline-[0.1px] rounded-lg p-2 overflow-y-scroll">
            {allReports?.map((item, index) => (
              <div 
              onClick={()=>navigate("/item/2")} key={index} className="outline text-white outline-[.1px] p-2  rounded-md">
                <h3 className="text-sm text-white font-bold">{item.itemType}</h3>
                <p className="text-xs">Reported on: 2023-09-20</p>
                <p className="text-sm">
                  Status: <span className="text-red-400">Lost</span>
                </p>
              </div>
            ))}
          </div></>
          
            }

          <div className="w-full flex items-center justify-center h-14">
            <button
              className="text-center outline-red-500 outline rounded-lg bg-red-500 py-2 px-7"
              onClick={() => setIsReporting(true)}
            >
              Report an Item
            </button>
          </div>
        </section>
      </div>

      {/* Modal for Reporting */}
      {isReporting && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 bg-opacity backdrop-blur-md"
            onClick={() => setIsReporting(false)} // Close modal on clicking outside
          ></div>

          {/* Modal Form */}
          <form
  onSubmit={handleSubmit}
  className="relative bg-black/20 border-[.1px]  p-6 rounded-lg w-full max-w-md sm:max-w-xl shadow-lg z-50"
>
  <h2 className="text-xl text-white font-bold mb-4">Report an Item</h2>
  
  {/* Two-Column Layout */}
  <div className="grid grid-cols-2  gap-4">
    {/* Item Type */}
    <div className="text-white">
      <label htmlFor="itemType" className="block text-white font-medium">Item Type:</label>
      <input
        type="text"
        id="itemType"
        name="itemType"
        value={formData.itemType}
        onChange={handleChange}
        required
        className="border p-2 rounded   w-full"
      />
    </div>

    {/* Location */}
    <div>
      <label htmlFor="location" className="block text-white  font-medium">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
    </div>

    {/* Specification */}
    <div>
      <label htmlFor="specification" className="block text-white  font-medium">Specification:</label>
      <input
        type="text"
        id="specification"
        name="specification"
        value={formData.specification}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
    </div>

    {/* Category */}
    <div>
      <label htmlFor="category" className="block text-white  font-medium">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="border p-2  rounded w-full"
      />
    </div>

    {/* Found On */}
    <div>
      <label htmlFor="foundOn" className="block text-white  font-medium">Found On:</label>
      <input
        type="date"
        id="foundOn"
        name="foundOn"
        value={formData.foundOn}
        onChange={handleChange}
        required
        className="border p-2  bg-[#474646] bg- rounded w-full"
      />
    </div>

    {/* Contact Info */}
    <div>
      <label htmlFor="contact" className="block text-white  font-medium">Contact Info:</label>
      <input
        type="number"
        id="contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
    </div>

    {/* Report Status */}
    <div className="col-span-2">
      <label htmlFor="reportStatus" className="block text-white  font-medium">Report Status:</label>
      <select
        id="reportStatus"
        name="reportStatus"
        value={formData.reportStatus}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Status</option>
        <option value="LOST">LOST</option>
        <option value="FOUND">FOUND</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="text-right spacex-4 mt-4">
    <button
      type="button"
      className="bg-red-500 text-white p-2 mr-3 rounded"
      onClick={() => setIsReporting(false)}
    >
      Cancel
    </button>
    <button type="submit" className="bg-green-700 text-white p-2 rounded">
      Submit
    </button>
  </div>
</form>

        </div>
      )}
    </div>
  );
};

export default LostAndFoundReport;
