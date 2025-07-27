import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/student`).then((res) => {
      console.log(res.data);
      setStudents(res.data)
    });
  }, []);
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 ">
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
                <tr key={student._id} className="border-b border-opacity-20 text-center border-gray-700 ">
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

                  <td className="p-3 ">
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
      </div>
    </div>
  );
};

export default ManageStudent;
