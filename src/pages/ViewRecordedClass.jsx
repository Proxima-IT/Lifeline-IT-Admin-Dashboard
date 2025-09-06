import axios from "axios";
import { SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const ViewRecordedClass = () => {
  const [selected, setSelected] = useState("Online");

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
            onClick={() => setSelected("Online")}
            className={`px-5 py-1  rounded-r-none shadow-md transition-all  h-10
            ${
              selected === "Online"
                ? " bg-[#39B54A] text-white"
                : "bg-[#f8f8f8] border   text-[#0071BC]"
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setSelected("Offline")}
            className={`px-5 py-1  rounded-l-none shadow-md transition-all  h-10
            ${
              selected === "Offline"
                ? "bg-[#ED1E79] text-white"
                : "bg-white border  text-[#0071BC]"
            }`}
          >
            Offline
          </button>
        </div>

        <div className="flex mt-5 w-full justify-between items-center px-5 ">
          {/* search bar  */}

          <div className="relative w-[80%] lg:w-1/4 mb-3 mr-4">
            <input
              type="text"
              placeholder="Name / Student ID / Phone"
              className="bg-[#183756] w-full text-center  mt-3 px-2 py-2 text-xs rounded outline-none text-white placeholder-gray-300"
            />
            <button className="absolute top-5 right-3 lg:right-5 text-gray-50">
              <IoMdSearch />
            </button>
          </div>

          <div className="flex justify-end px-2 lg:px-10 mb-3">
            <Link to="/add-courses">
              <button className="bg-[#F15B27] px-2 lg:px-3 text-xs lg:text-base py-2 rounded-md text-white flex items-center gap-3">
                <FaPlus />
                Upload Recorded Class
              </button>
            </Link>
          </div>
        </div>

        <div className="text-white p-4 rounded-lg flex justify-center">
          <div className="flex flex-wrap gap-4 items-end">
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
                  Course
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

              {/* Batch */}
              <div className="flex flex-col">
                <label className="text-sm text-left text-white mb-1">
                  Batch No
                </label>
                <select
                  value={select.batch}
                  onChange={(e) => handleChange("batch", e.target.value)}
                  className="bg-[#2b3042] text-gray-300 px-3 py-2 rounded-md focus:outline-none w-40"
                >
                  <option>All</option>
                  {filters.batch.map((b, i) => (
                    <option key={i}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Session */}
              <div className="flex flex-col">
                <label className="text-sm text-left text-white mb-1">
                  Session
                </label>
                <select
                  value={select.session}
                  onChange={(e) => handleChange("session", e.target.value)}
                  className="bg-[#2b3042] text-gray-300 px-3 py-2 rounded-md focus:outline-none w-40"
                >
                  <option>All</option>
                  {filters.session.map((s, i) => (
                    <option key={i}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="flex flex-col">
                <label className="text-sm text-left text-white mb-1">
                  Year
                </label>
                <select
                  value={select.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  className="bg-[#2b3042] text-gray-300 px-3 py-2 rounded-md focus:outline-none w-40"
                >
                  <option>All</option>
                  {filters.year.map((y, i) => (
                    <option key={i}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-6 my-3 mx-4 lg:mx-10">
          {/* // main dynamic content goes here */}
          <div className="container p-2 mx-auto sm:p-4 flex flex-col items-center ">
            <div className="w-full overflow-x-scroll">
              <table className=" text-left w-full">
                <colgroup>
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="bg-[#5D469C] rounded-md whitespace-nowrap mb-3 text-left">
                  <tr className="text-left lg:text-base text-sm ">
                    <th className="p-3">CL. No</th>
                    <th className="p-3">Class Title</th>
                    <th className="p-3">Action Button</th>
                  </tr>
                </thead>
                <tbody className="whitespace-nowrap ">
                  {
                    selected === "Online" ? ( <tr className="text-left text-gray-200 bg-[#193756] ">
                    <td className="text-center">1</td>
                    <td>
                      Website Traffic Campaign - Event Marketing - Business
                      Manager [Friday Special Class 05]
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-2">
                        <Link to={""}>
                          <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#F15B27] text-white">
                            Update
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>) : "Offline Recorded Class Data"
                  }
                 
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
