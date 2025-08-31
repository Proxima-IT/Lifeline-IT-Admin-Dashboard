import axios from "axios";
import { SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const ViewRecordedClass = () => {
  const [selected, setSelected] = useState(true);

  const [filters, setFilters] = useState({
    batch: [],
    session: [],
    year: [],
    course: [],
  });

  const [select, setSelect] = useState({
    batch: "All",
    session: "All",
    year: "All",
    course: "All",
  });

  // 🔹 API থেকে dropdown এর data আনা
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get("https://api.example.com/filters");
        // API response format উদাহরণ:
        // {
        //   batch: ["Batch 1", "Batch 2"],
        //   session: ["Morning", "Evening"],
        //   year: ["2023", "2024"],
        //   course: ["CSE", "EEE", "BBA"]
        // }
        setFilters(res.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchFilters();
  }, []);
  return (
    <div>
      <main className="flex-1  overflow-y-auto w-full font-roboto">
        <div className="text-xl font-bold text-white mb-4 bg-[#1398DB] w-[80%] lg:w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          All Recorded Classes
        </div>

        <div className="h-10">
          <button
            onClick={() => setSelected("Offline")}
            className={`px-5 py-1  rounded-r-none shadow-md transition-all  h-10
                        ${
                          selected === "Offline"
                            ? " bg-[#39B54A] text-white"
                            : "bg-[#f8f8f8] border   text-[#0071BC]"
                        }`}
          >
            Online
          </button>
          <button
            onClick={() => setSelected("Online")}
            className={`px-5 py-1  rounded-l-none shadow-md transition-all  h-10
                        ${
                          selected === "Online"
                            ? "bg-[#ED1E79] text-white"
                            : "bg-white border  text-[#0071BC]"
                        }`}
          >
            Offline
          </button>
        </div>

        <div className="text-white px-10 rounded-lg flex justify-between">
          <div className="flex  gap-4 items-center">
            {/* Left side */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} />
              <span className="font-medium">Filter</span>
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap gap-6 flex-1">
              {/* Course */}
              <div className="flex flex-col">
                <label className="text-sm text-left text-white mb-1">
                  Course Name
                </label>
                <select
                  value={select.course}
                  onChange={(e) => handleChange("course", e.target.value)}
                  className="bg-[#2b3042] text-gray-300 px-3 py-2 rounded-md focus:outline-none w-40"
                >
                  <option>All</option>
                  {filters.course.map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* search bar  */}
          <div className="flex w-full justify-center lg:justify-end">
            <div className="relative w-[80%] lg:w-1/4 mb-3 mr-4">
              <input
                type="text"
                placeholder="Name / Student ID / Phone"
                className="bg-[#183756] w-full text-center  mt-3 px-2 py-2 text-xs rounded outline-none text-white placeholder-white"
              />
              <button className="absolute top-5 right-3 lg:right-5 text-gray-50">
                <IoMdSearch />
              </button>
            </div>
          </div>

          <div className=" mb-3">
            <Link to="/add-courses">
              <button className="bg-[#ED1E79] px-2 lg:px-3 text-sm lg:text-base py-2 rounded-md text-white flex items-center gap-3">
                <FaPlus />
                Add New Course
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-6 my-3 mx-4 lg:mx-10">
          {/* // main dynamic content goes here */}
          <div className="container p-2 mx-auto sm:p-4 flex flex-col items-center ">
            <div className="w-full overflow-x-scroll">
              <table className=" text-center">
                <colgroup>
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="bg-[#00A99D] rounded-md ">
                  <tr className="text-center lg:text-base text-sm ">
                    <th className="p-3">#</th>
                    <th className="p-3">Name of Student</th>
                    <th className="p-3">Student ID & Registration No</th>
                  </tr>
                </thead>
                <tbody>
                  <td></td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewRecordedClass;
