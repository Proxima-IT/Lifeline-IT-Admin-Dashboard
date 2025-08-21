import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const PaymentReport = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [selected, setSelected] = useState(true);

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
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          Student Payment Report
        </div>

        <div className="flex items-center px-6">
          <Link to="/add-courses">
            <button className="bg-[#ED1E79] px-2 lg:px-3 text-sm lg:text-lg py-2 rounded-md text-white flex items-center gap-3">

              Online Payment Request
              <div className="relative">
                <FaBell className="text-xl  cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                  0
                </span>
              </div>
            </button>

          </Link>
        </div>

        <div className="h-10">
          <button
            onClick={() => setSelected("Offline")}
            className={`px-5 py-1  rounded-r-none shadow-md transition-all  h-10
            ${selected === "Offline"
                ? " bg-[#39B54A] text-white"
                : "bg-[#f8f8f8] border   text-[#0071BC]"
              }`}
          >
            Online
          </button>
          <button
            onClick={() => setSelected("Online")}
            className={`px-5 py-1  rounded-l-none shadow-md transition-all  h-10
            ${selected === "Online"
                ? "bg-[#ED1E79] text-white"
                : "bg-white border  text-[#0071BC]"
              }`}
          >
            Offline
          </button>
        </div>

        <div className="flex w-full justify-end">
          <div className="relative w-1/2 mb-3 ">
            <input
              type="text"
              placeholder="Name / Student ID / Phone"
              className="bg-[#183756] ml-4 px-2 py-2 text-xs rounded outline-none text-white placeholder-white"
            />
            <button className="absolute top-3 right-16 text-gray-50">
              <IoMdSearch />
            </button>
          </div>
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-6 my-3 mx-10">
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
                <thead className="bg-[#00A99D] rounded-md">
                  <tr className="text-center lg:text-base text-sm ">
                    <th className="p-3">#</th>
                    <th className="p-3">Name of Student</th>
                    <th className="p-3">Student ID & Registration No</th>
                    <th className="p-3">Course Name</th>
                    <th className="p-3">Payment Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment Method</th>
                    <th className="p-3">Payment Status &
                      Transection ID</th>
                    <th className="p-3">Payment
                      Receipt</th>
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
                        Computer Office Management
                      </td>

                      <td className="p-3">
                        08-09-2025
                      </td>

                      <td className="p-3">
                        5,000.00
                      </td>

                      <td className="p-3">
                        Bkash
                      </td>

                      <td className="p-3">
                        <div className="flex flex-col gap-2">
                          <Link to={`/student/${student.sid}`}>
                            <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#39B54A] text-white">
                              Paid
                            </span>
                          </Link>
                          <Link to={`/student/${student.sid}`}>
                            <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#FF2035] text-white">
                              Due
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

                          <Link to={`/student/${student.sid}`}>
                            <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#FFFFFF] text-black">
                              Preview
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
                  className={`px-3 py-1 rounded ${page === i + 1
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
                className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
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

export default PaymentReport;


