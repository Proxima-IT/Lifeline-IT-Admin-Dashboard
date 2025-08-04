import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../../assets/Website Logo.png";

import {
  MdOutlineHome,
  MdOutlineInsertComment,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import {
  FaAngleDoubleUp,
  FaBars,
  FaRegClock,
  FaRegComment,
  FaUserGraduate,
} from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GrCertificate } from "react-icons/gr";
import { IoChevronUpCircle, IoNewspaperOutline } from "react-icons/io5";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import axios from "axios";

import { CiLock } from "react-icons/ci";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoIosPaper, IoMdClose, IoMdLock } from "react-icons/io";

import { AiOutlineMenuFold } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
// import { toast, ToastContainer } from "react-toastify"

const SideNav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //   const { data, isLoading } = dashboardData()
  //   const { notices } = useNotice()

  const handleLogout = async () => {
    setTimeout(async () => {
      await axios.get(import.meta.env.VITE_API_URL + `/api/auth/logout`, {
        withCredentials: true,
      })
      window.location.href = import.meta.env.VITE_PUBLIC_PAGE
    }, 4000)

    toast.success(`Admin is successfully logged out`, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: false,
      theme: "dark",
    })
  }


  // if ("isLoading")
  //   return (
  //     <div>
  //       <div className="flex justify-center items-center h-40">
  //         <div className="flex space-x-2">
  //           <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce"></div>
  //           <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.2s]"></div>
  //           <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:.4s]"></div>
  //         </div>
  //       </div>
  //     </div>
  //   )

  const [notices, setNotices] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/dashboard/notices`)
      .then((res) => {
        console.log(res.data);
        setNotices(res.data);
      });
  }, []);
  return (
    <div>
      {/* <!-- Navigation --> */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 px-4">
          <Link
            to={`${import.meta.env.VITE_PUBLIC_PAGE}`}
            className="w-1/2 md:w-1/4"
          >
            <img
              src={logo}
              alt="SR DREAM IT Logo"
              className="w-full lg:w-1/2"
            />
          </Link>

          <div
            className="text-[#0B254C] text-2xl lg:hidden flex justify-end"
            onClick={toggleNavbar}
          >
            <FaAngleDoubleUp />
          </div>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Mobile Drawer */}
          <div
            className={`fixed z-50 bottom-0 right-0 h-[80vh] overflow-auto lg:hidden w-full bg-blue-50 border-l border-neutral-300 shadow-lg transition-transform duration-500 ease-in-out transform ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="w-full flex items-center justify-between px-4">
              {/* <Link
                to="/"
                className="text-lg font-semibold text-sky-700 flex items-center gap-x-2"
              >
                <img src={logo} alt="" className="w-1/2 md:w-1/3" />
              </Link> */}
              {/* <div></div> */}
              {/* <div className="lg:hidden flex justify-end py-6">
                <button
                  onClick={toggleNavbar}
                  className="text-gold focus:outline-none"
                >
                  <IoMdClose size={30} />
                </button>
              </div> */}
            </div>

            {/* <div className="border-b border-gray-700 pt-4"></div> */}

            <div className="flex-1 flex flex-col items-center justify-between gap-6 p-6">
              <ul
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-start justify-center gap-6 text-base text-neutral-700 font-normal font-roboto"
              >
                <li>
                  <NavLink
                    to="/admin"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <FiHome /> Admin Panel
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/payment"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <MdOutlineShoppingCart /> Payment Reports
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/courses"
                    className="flex items-center gap-2 p-2 rounded-md"
                  >
                    <RiGraduationCapFill /> Courses
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/student"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <FaUserGraduate /> Manage Students
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/notice"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <MdOutlineInsertComment /> Notice Board
                    <span className="ml-auto text-xs bg-red-300 text-red-900 font-bold px-2 py-0.5 rounded-full">
                      {notices?.length}
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/registration"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <IoNewspaperOutline /> Registration Cards
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/certificate"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <GrCertificate /> Certificates
                  </NavLink>
                </li>

                <h3 className="text-left ml-3 text-gray-800">Admin</h3>

                <li>
                  <NavLink
                    to="/password-reset"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <IoMdLock /> Change Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                  >
                    <FaArrowRightFromBracket /> Logout
                  </NavLink>
                </li>
              </ul>
            </div>

            
          </div>
        </div>
      </header>

      {/* <!-- Main Layout --> */}
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 lg:mt-5 px-2 lg:px-4">
        {/* <!-- Sidebar --> */}
        <aside className="lg:w-1/4 w-full hidden lg:block">
          <div className="bg-white shadow-card rounded-xl p-6">
            <div className="uppercase text-sm text-gray-500 mb-4">
              Welcome, <strong>Admin</strong>
            </div>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <FiHome /> Admin Panel
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/payment"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <MdOutlineShoppingCart /> Payment Reports
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/courses"
                  className="flex items-center gap-2 p-2 rounded-md"
                >
                  <RiGraduationCapFill /> Courses
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/student"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <FaUserGraduate /> Manage Students
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/notice"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <MdOutlineInsertComment /> Notice Board
                  <span className="ml-auto text-xs bg-red-300 text-red-900 font-bold px-2 py-0.5 rounded-full">
                    {notices?.length}
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/registration"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <IoNewspaperOutline /> Registration Cards
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/certificate"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <GrCertificate /> Certificates
                </NavLink>
              </li>

              <h3 className="text-left ml-3 text-gray-800">Admin</h3>

              <li>
                <NavLink
                  to="/password-reset"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <IoMdLock /> Change Password
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                   onClick={handleLogout}
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <FaArrowRightFromBracket /> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>

        <div className="lg:w-3/4 bg-white shadow-card h-max rounded-xl lg:p-8">
          {/* page wise content */}

          <Outlet></Outlet>
        </div>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SideNav;
