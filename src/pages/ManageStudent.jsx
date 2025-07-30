import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/student?page=${page}&limit=10`)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data.getStudents);
        setTotalPages(res.data.totalPages)
        setTotalStudents(res.data.totalStudents)
      });
  }, [page]);
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 ">
        <h1 className="text-2xl mb-3 text-blue-900 font-bold">
          Total Students: {totalStudents}
        </h1>
        <h2 className="mb-6 text-2xl text-left font-semibold leading-tight">
          Students Information
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead className="">
              <tr className="text-center lg:text-base text-sm ">
                <th className="p-3">SID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Student Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="border-b border-opacity-20 text-center border-gray-700 "
                >
                  <td className="p-3">
                    <p>{student.sid}</p>
                  </td>
                  <td className="p-3">
                    <p>{student.name}</p>
                  </td>
                  <td className="p-3">
                    <p>{student.email}</p>
                  </td>
                  <td className="p-3">
                    <p>{student.phone}</p>
                  </td>

                  <td className="p-3">
                    <Link to={`/student/${student.sid}`}>
                      <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#0b2a53] text-white">
                        <span>View</span>
                      </span>
                    </Link>
                  </td>
                  {/* <td className="p-3 ">
                  <span className="px-3 py-1 font-semibold rounded-md cursor-pointer bg-[#0b2a53] text-white">
                    <span>Delete</span>
                  </span>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
