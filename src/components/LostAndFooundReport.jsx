import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllFilterData, setFilterdata } from "../redux/lostAndFound";

const LostAndFoundReport = () => {
  const navigate = useNavigate();
  const [isReporting, setIsReporting] = useState(false);
  const dispatch = useDispatch();
  
  const { allReports } = useSelector((store) => store.reports);
  const { isLoadingReports } = useSelector((store) => store.reports);
  const { filterData } = useSelector((store) => store.reports);

  const [filteredReports, setFilteredReports] = useState([]);

  const [formData, setFormData] = useState({
    itemType: "",
    location: "",
    specification: "",
    category: "",
    foundOn: "",
    contact: "",
    reportStatus: "",
  });
  useEffect(() => {
    function filterReports() {
      console.log("Filtering with:", filterData);

      if (filterData.category || filterData.date || filterData.status) {
        const newFilteredReports = allReports.filter((report) => {
          const matchesCategory = filterData.category
            ? report.category === filterData.category
            : true;
          const matchesDate = filterData.date
            ? report.foundOn === filterData.date
            : true;
          const matchesStatus = filterData.status
            ? report.reportStatus === filterData.status
            : true;
          return matchesCategory && matchesDate && matchesStatus;
        });

        setFilteredReports(newFilteredReports);
      } else {
        setFilteredReports(allReports);
      }
    }

    if (allReports) {
      filterReports();
    }
  }, [filterData, allReports]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    setIsReporting(false);
    // TODO: Send `formData` to the backend using axios or fetch
  };

  return (
    <div className="relative text-white h-[86vh] md:h-[91vh] p-4 sm:p-6">
      {/* Background content */}
      <div className={`flex h-[85vh] lg:grid lg:grid-cols-4 md:gap-4 ${isReporting ? "blur-sm" : ""}`}>
        {/* Sidebar */}
        <aside className="space-y-4 border-r-[1px] pr-3 w-[54%] md:w-full lg:col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium">Filter by Category</label>
            <select
              onChange={(e) =>
                dispatch(
                  setFilterdata({
                    type: "category",
                    val: e.target.value,
                  })
                )
              }
              value={filterData.category}
              className="w-full bg-black outline outline-[0.1px] text-white rounded-md p-2"
            >
              <option value="">All</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Filter by Date</label>
            <input
              onChange={(e) =>
                dispatch(
                  setFilterdata({
                    type: "date",
                    val: e.target.value,
                  })
                )
              }
              value={filterData.date}
              type="date"
              className="w-full bg-black border-[0.1px] text-white rounded-md p-2"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Filter by Status</p>
            <div className="space-y-1">
              <label className="flex items-center gap-2">
                <input
                  onClick={() =>
                    dispatch(
                      setFilterdata({
                        type: "status",
                        val: "LOST",
                      })
                    )
                  }
                  value={filterData.status}
                  type="radio"
                  checked={filterData.status==="LOST"}
                  name="status"
                  className="text-cyan-500"
                />
                <span>Lost</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  onClick={() =>
                    dispatch(
                      setFilterdata({
                        type: "status",
                        val: "FOUND",
                      })
                    )
                  } 
                 
                  type="radio"
                  checked={filterData.status==="FOUND"}

                  name="status"
                  className="text-cyan-500"
                />
                <span>Found</span>
              </label>
            </div>

           <div className="text-center">
           <button className="mt-5 text-center " onClick={()=>dispatch(setAllFilterData())}>clear filter</button>
           </div>
          </div>
        </aside>

        {/* Reported Items */}
        <section className="space-y-4 px-1 w-full lg:col-span-3">
          <h2 className="text-lg font-medium">Reported Items</h2>

          <div
            className={`${
              isLoadingReports ? "flex items-center justify-center" : ""
            } space-y-4 w-full h-[65vh] md:h-[460px] outline outline-[0.1px] rounded-lg p-2 overflow-y-scroll`}
          >
            {isLoadingReports ? (
              <h1>Fetching reports...</h1>
            ) : (
              <>{
                filteredReports.length>0 ? <> {
                  filteredReports?.map((item, index) => (
                <div
                  onClick={() => navigate(`/item/${item._id}`)}
                  key={index}
                  className="outline text-white bg-[#18192f] outline-[.1px] p-2 rounded-md"
                >
                  <h3 className="text-sm md:text-base text-white font-bold">
                    {item.itemType}
                  </h3>
                  <p className="text-xs">Reported on: {item.foundOn}</p>
                  <p className="text-sm">
                    Status:{" "}
                    <span className="text-red-400">{item.reportStatus}</span>
                  </p>
                </div>
              ))
                }</>:<h1>
                  no data found
                </h1>
              }
              </>
            )}
          </div>

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
            onClick={() => setIsReporting(false)}
          ></div>

          {/* Modal Form */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-black/20 border-[.1px] p-6 rounded-lg w-full max-w-md sm:max-w-xl shadow-lg z-50"
          >
            <h2 className="text-xl text-white font-bold mb-4">Report an Item</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="itemType" className="block text-white font-medium">
                  Item Type:
                </label>
                <input
                  type="text"
                  id="itemType"
                  name="itemType"
                  value={formData.itemType}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-white font-medium">
                  Location:
                </label>
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
              <div>
                <label htmlFor="specification" className="block text-white font-medium">
                  Specification:
                </label>
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
              <div>
                <label htmlFor="category" className="block text-white font-medium">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="foundOn" className="block text-white font-medium">
                  Found On:
                </label>
                <input
                  type="date"
                  id="foundOn"
                  name="foundOn"
                  value={formData.foundOn}
                  onChange={handleChange}
                  required
                  className="border p-2 bg-[#474646] rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-white font-medium">
                  Contact Info:
                </label>
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
            </div>
         <div className="mt-4 flex justify-end">
         <button
             onClick={()=>setIsReporting(false)}
              className="mr-4 py-3 px-4 bg-red-500 text-white font-bold rounded"
            >
              cancel
            </button>
            <button
              type="submit"
              className="  py-3 px-4 bg-green-500 text-white font-bold rounded"
            >
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
