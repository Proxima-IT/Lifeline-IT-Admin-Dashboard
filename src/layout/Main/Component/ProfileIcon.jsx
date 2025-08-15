import React, { useState } from "react";


import { Avatar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { useDashboard } from "../../../hooks/useDashboard";

export function ProfileIcon() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data, isLoading } = useDashboard();

  const handleLogout = async () => {
    setTimeout(async () => {
      await axios.get(import.meta.env.VITE_API_URL + `/api/auth/logout`, {
        withCredentials: true,
      });
      window.location.href = import.meta.env.VITE_PUBLIC_PAGE;
    }, 4000);

    toast.success(`${data?.name} is successfully logged out`, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: false,
      theme: "dark",
    });
  };

  return (
    <div
      className="relative inline-block  z-20"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {/* <Button variant="outline" className="border-2 border-white rounded-full">
        Open
      </Button> */}
      <div className="border-2 border-white rounded-full">
        <IconButton
          //   onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          className="border-2 border-white rounded-full"
        >
          <Avatar alt="" src={data?.image} />
        </IconButton>
      </div>

      <div
        className={`absolute lg:-left-36 p-4  w-52 rounded-md shadow-md text-black bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform ${
          showDropdown
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="my-2 flex justify-between pb-2">
          <div className="border-2 p-[2px] border-blue-300  rounded-full">
            <Avatar alt="" src={data?.image} className="shadow-md" />
          </div>
          <div className=" flex flex-col items-end">
            <h2 className="text-base font-semibold ">{data?.name}</h2>
            {/* <Link
              to="/profile"
              className="relative flex items-center gap-2 text-sm text-blue-900 transition-all duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full hover:after:right-0 hover:after:translate-y-0"
            >
              View Profile
            </Link> */}
            <div className="">Admin</div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col items-start">
          {/* <Link
            to="/profile"
            className="flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 p-2 rounded-md pb-2"
          >
            <FaUserGraduate /> My Profile
          </Link> */}

          <Link
            to="/password-reset"
            className="flex items-center gap-2 hover:bg-gray-100 transition-all duration-300  p-2 rounded-md "
          >
            <IoMdLock /> Change Password
          </Link>

          <Link
            to="/"
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 rounded-md"
          >
            <FaArrowRightFromBracket /> Logout
          </Link>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
