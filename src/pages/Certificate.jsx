import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Certificate = ({ data }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleDownload = async (studentId, courseRoute, Grade) => {
    setBtnLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/dashboard/certificate`,
        { studentId, courseId: courseRoute, grade: Grade },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob", // expect PDF
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${studentId}-certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (
        error.response?.status !== 200 &&
        error.response?.data instanceof Blob
      ) {
        const text = await error.response.data.text(); // Convert blob to text
        const json = JSON.parse(text);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: json.error,
          showCancelButton: true,
          confirmButtonText: "Go to Course",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) navigate(`/courses/update/${courseRoute}`);
        });
      }
      console.error(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const onSubmit = (formData) => {
    const { sid, courseRoute, grade } = formData;
    handleDownload(sid, courseRoute, grade); // assuming courseRoute is also title
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Link to="/certificate-apply">
          <button className="bg-[#0b2a53] px-2 lg:px-3 text-sm lg:text-lg py-2 rounded-md text-white flex items-center gap-3">
            View Application
          </button>
        </Link>
        <h1 className="text-xl text-blue-500 font-bold text-center mb-3">
          Certificate
        </h1>
        {/* Course Route */}
        <div className="mb-4">
          <label
            htmlFor="courseRoute"
            className="block text-sm font-medium text-left text-gray-700"
          >
            Course Route
          </label>
          <input
            type="text"
            id="courseRoute"
            {...register("courseRoute", { required: true })}
            placeholder="Enter course route"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Student ID */}
        <div className="mb-4">
          <label
            htmlFor="sid"
            className="block text-sm font-medium text-left text-gray-700"
          >
            Student ID
          </label>
          <input
            type="text"
            id="sid"
            {...register("sid", { required: true })}
            placeholder="Enter Student ID"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        {/* Student Grade */}
        <div className="mb-4">
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-left text-gray-700"
          >
            Student Grade
          </label>
          <input
            type="text"
            id="grade"
            {...register("grade", { required: true })}
            placeholder="Enter Student Grade"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={btnLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          {btnLoading ? "Downloading..." : "Download Certificate"}
        </button>
      </form>
    </div>
  );
};

export default Certificate;
