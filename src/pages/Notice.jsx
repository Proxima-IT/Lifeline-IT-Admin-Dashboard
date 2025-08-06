import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/dashboard/notices`)
      .then((res) => {
        console.log(res.data);
        setNotices(res.data);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_API_URL}/api/dashboard/notices/delete/${id}`
          )
          .then(
            Swal.fire({
              title: "Deleted!",
              text: "Your Notice has been deleted.",
              icon: "success",
            })
          );
      }
    });
  };

  return (
    <div className="my-5">
      <div className="flex justify-between">
        <h2 class="text-2xl font-bold mb-4 text-left text-[#0b2a53]">
          All Notice
        </h2>
        <Link to="/add-notice">
          <button className="bg-[#0b2a53] px-3 py-2 rounded-md text-white flex items-center gap-3">
            <FaPlus />
            Add New Notice
          </button>
        </Link>
      </div>

      {notices.length > 0 ? (
        notices.map((notice) => (
          <div className="w-full rounded-xl p-4 shadow-lg text-left flex flex-col space-y-3">
            <img src={notice.image} alt="" className="w-full" />
            <h2 className="italic text-sm">Date: {notice.date}</h2>
            <h1 className="font-bold text-2xl">{notice.title}</h1>
            <p>{notice.description}</p>

            <button
              onClick={() => {
                handleDelete(notice._id);
              }}
              className="bg-red-700 px-3 py-2 rounded-md text-white flex self-end gap-3"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="bg-blue-50 rounded-lg p-4 min-h-28">
          <p className="text-2xl font-bold text-[#b96c16]">No Notices Found</p>
        </div>
      )}
    </div>
  );
};

export default Notice;
