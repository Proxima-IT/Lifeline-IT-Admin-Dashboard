import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CertificateApply = () => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/dashboard/certificate/apply`)
      .then((res) => {
        console.log(res.data.applyCertificate);
        setApplications(res.data.applyCertificate);
      });
  }, []);

  const handleApprove = (applyId) => {
    const userInput = window.prompt("Enter Student Grade:");
    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/dashboard/certificate/apply/accept`,
        {
          applyId: applyId,
          grade: userInput,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Course added successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      });
  };

  const handleReject = (applyId) => {
    const userInput = window.prompt("Enter Student Grade:");
    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/dashboard/certificate/apply/reject`,
        {
          applyId: applyId,
          grade: userInput,
        }
      )
      .then((res) => console.log(res.data));
  };
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>sid</th>
            <th>drive link</th>
            <th colSpan={2}>action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr className="space-x-3">
              <td>{application.studentId}</td>
              <td className="text-blue-900 underline">
                <Link to={application.driveLink}>{application.driveLink}</Link>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleApprove(application._id);
                  }}
                >
                  ✅
                </button>
              </td>
              <td>
                {" "}
                <button
                  onClick={() => {
                    handleReject(application._id);
                  }}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CertificateApply;
