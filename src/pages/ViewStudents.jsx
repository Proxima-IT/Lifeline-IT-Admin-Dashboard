import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

import { SlidersHorizontal } from "lucide-react";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
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

  const handleChange = (key, value) => {
    setSelect((prev) => ({ ...prev, [key]: value }));

    // 🔹 এখানেই তুমি backend এ call করতে পারো selected value দিয়ে
    // axios.get(`https://api.example.com/data?${key}=${value}`)
    //   .then(res => console.log(res.data))
  };

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
          View All Students
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


        <div className=" text-white p-4 rounded-lg  flex justify-center">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} />
          <span className="font-medium">Filter</span>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-3 flex-1">
          {/* Batch */}
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

          {/* Session */}
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

          {/* Year */}
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

          {/* Course */}
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

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-6 my-3 mx-4 lg:mx-10">
          {/* // main dynamic content goes here */}
          <div className="container p-2 mx-auto sm:p-4 flex flex-col items-center ">
            <div className="w-full overflow-x-scroll">
              <table className=" text-center">
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
                    <th className="p-3">Name of Student</th>
                    <th className="p-3">Student ID & Registration No</th>
                    <th className="p-3">Course Name</th>
                    <th className="p-3">Phone</th>
                    
                    <th className="p-3">Image</th>
                    <th className="p-3">Update Student Infomation</th>
                    <th className="p-3">Registration Card</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className="w-full border-b border-opacity-20 text-center bg-[#183756] border-gray-700 "
                    >
                      <td className="p-3">
                        <p>{index + 1}</p>
                      </td>

                      <td className="p-3">
                        <p>{student.name}</p>
                      </td>

                      <td className="p-3">
                        <p>{student.sid}</p>
                      </td>

                      <td className="p-3">
                        <p>{student.sid}</p>
                      </td>

                      <td className="p-3">
                        <p>{student.phone}</p>
                      </td>                     

                      <td className="p-3">
                        <img src={student.image} alt="" className="w-20 h-14" />
                      </td>

                      <td className="p-3">
                        <div className="flex flex-col gap-2">
                          <Link to={`/update-student/${student.sid}`}>
                            <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#39B54A] text-white">
                              View
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
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4 gap-2 ">
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

export default ViewStudents;
