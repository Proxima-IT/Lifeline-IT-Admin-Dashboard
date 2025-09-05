import axios from "axios";
import { SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const Certificate = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/student?page=${page}&limit=10`)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data.getStudents);
        setTotalPages(res.data.totalPages);
        setTotalStudents(res.data.totalStudents);
      });
  }, [page]);

  return (
    <div>
      <main className="flex-1  overflow-y-auto w-full font-roboto">
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-[80%] lg:w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          Certificate Manage
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

        {/* search bar  */}
        <div className="flex w-full justify-center lg:justify-end">
          <div className="relative w-[80%] lg:w-1/4 mb-3 mr-4">
            <input
              type="text"
              placeholder="Name / Student ID / Phone"
              className="bg-[#183756] w-full text-center  mt-3 px-2 py-2 text-xs rounded outline-none text-white placeholder-gray-200"
            />
            <button className="absolute top-5 right-3 lg:right-5 text-gray-50">
              <IoMdSearch />
            </button>
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
                  Batch
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
          <h1>Certificate Request</h1>
          <div className="container p-2 mx-auto sm:p-4 flex flex-col items-center ">
            <div className="w-full overflow-x-scroll">
              <table className="text-center overflow-x-scroll ">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="bg-[#00A99D] rounded-md ">
                  <tr className="text-center lg:text-base text-sm ">
                    <th className="p-3">#</th>
                    <th className="p-3">Student ID & Registration No</th>
                    <th className="p-3">Name of Student</th>
                    <th className="p-3">Course Name</th>

                    {selected === "Online" && (
                      <th className="p-3">Assignment & Homeworks</th>
                    )}

                    <th className="p-3">Student Details</th>
                    {selected === "Offline" && (
                      <th className="p-3">Payment Status</th>
                    )}
                    {selected === "Online" && (
                      <th className="p-3">Action Button</th>
                    )}

                    <th className="p-3">Certificate Download</th>
                  </tr>
                </thead>
                <tbody>
                  {selected === "Online"
                    ? students.map((student, index) => (
                        <tr
                          key={student._id}
                          className="w-full border-b border-opacity-20 text-center bg-[#183756] border-gray-700 "
                        >
                          <td className="p-3">
                            <p>{index + 1}</p>
                          </td>

                          <td className="p-3">
                            <p>{student.sid}</p>
                          </td>

                          <td className="p-3">
                            <p>{student.name}</p>
                          </td>

                          <td className="p-3">
                            <p>Computer Office Management</p>
                          </td>

                          <td>
                            <Link to={`/student/${student.sid}`}>
                              <span className="px-3 py-2 font-semibold rounded-md cursor-pointer bg-[#0071FF] text-white">
                                View
                              </span>
                            </Link>
                          </td>

                          <td>
                            <Link to={`/student/${student.sid}`}>
                              <span className="px-2 text-sm py-2 font-semibold rounded-md cursor-pointer bg-[#f5f7f5] text-black">
                                View
                              </span>
                            </Link>
                          </td>

                          {selected === "Offline" && (
                            <td className="p-3">
                              <div className="flex flex-col gap-3">
                                <Link to={`/student/${student.sid}`}>
                                  <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#39B54A] text-white">
                                    Paid
                                  </span>
                                </Link>
                                <Link to={`/student/${student.sid}`}>
                                  <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#FF0000] text-white">
                                    Due
                                  </span>
                                </Link>
                              </div>
                            </td>
                          )}

                          <td className="p-3">
                            <div className="flex flex-col gap-3">
                              <Link to={`/student/${student.sid}`}>
                                <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#39B54A] text-white">
                                  Accept
                                </span>
                              </Link>
                              <Link to={`/student/${student.sid}`}>
                                <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#FF0000] text-white">
                                  Reject
                                </span>
                              </Link>
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="flex flex-col gap-2">
                              <Link to={`/student/${student.sid}`}>
                                <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#F15A24] text-white">
                                  Download
                                </span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    : students.map((student, index) => (
                        <tr
                          key={student._id}
                          className="w-full border-b border-opacity-20 text-center bg-[#183756] border-gray-700 "
                        >
                          <td className="p-3">
                            <p>{index + 1}</p>
                          </td>

                          <td className="p-3">
                            <p>{student.sid}</p>
                          </td>

                          <td className="p-3">
                            <p>{student.name}</p>
                          </td>

                          <td className="p-3">
                            <p>Computer Office Management</p>
                          </td>

                          {selected === "Online" && (
                            <td>
                              <Link to={`/student/${student.sid}`}>
                                <span className="px-3 py-2 font-semibold rounded-md cursor-pointer bg-[#0071FF] text-white">
                                  View
                                </span>
                              </Link>
                            </td>
                          )}

                          <td>
                            <Link to={`/student/${student.sid}`}>
                              <span className="px-2 text-sm py-2 font-semibold rounded-md cursor-pointer bg-[#f5f7f5] text-black">
                                View
                              </span>
                            </Link>
                          </td>

                          {selected === "Offline" && (
                            <td className="p-3">
                              <div className="flex flex-col gap-3">
                                <Link to={`/student/${student.sid}`}>
                                  <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#39B54A] text-white">
                                    Paid
                                  </span>
                                </Link>
                                <Link to={`/student/${student.sid}`}>
                                  <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#FF0000] text-white">
                                    Due
                                  </span>
                                </Link>
                              </div>
                            </td>
                          )}

                          {selected === "Online" && (
                            <td className="p-3">
                              <div className="flex flex-col gap-3">
                                <Link to={`/student/${student.sid}`}>
                                  <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#39B54A] text-white">
                                    Accept
                                  </span>
                                </Link>
                                <Link to={`/student/${student.sid}`}>
                                  <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#FF0000] text-white">
                                    Reject
                                  </span>
                                </Link>
                              </div>
                            </td>
                          )}

                          <td className="p-3">
                            <div className="flex flex-col gap-2">
                              <Link to={`/student/${student.sid}`}>
                                <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#F15A24] text-white">
                                  Download
                                </span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-blue-500 text-black"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-2 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Certificate;
