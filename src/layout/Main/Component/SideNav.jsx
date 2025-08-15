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
  FaBell,
  FaChevronDown,
  FaChevronRight,
  FaRegClock,
  FaRegComment,
  FaUserCircle,
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
import { IoIosPaper, IoMdClose, IoMdLock, IoMdSearch } from "react-icons/io";

import { AiOutlineMenuFold } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
// import { toast, ToastContainer } from "react-toastify"
import { GiHamburgerMenu } from "react-icons/gi";
import { useDashboard } from "../../../hooks/useDashboard";
import { ProfileIcon } from "./ProfileIcon";

const SideNav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);

  const [isOpen, setIsOpen] = useState(true);

  const { data, isLoading, error } = useDashboard();

  const toggleNavbar = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [isOpen]);

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
      });
      window.location.href = import.meta.env.VITE_PUBLIC_PAGE;
    }, 4000);

    toast.success(`Admin is successfully logged out`, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: false,
      theme: "dark",
    });
  };

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

  const hours = new Date().getHours();
  let greeting = "";

  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div>
      <div className="flex w-full min-h-screen bg-[#0E2035] text-white ">
        {/* Sidebar */}
        {isOpen && (
          <aside className="w-72 bg-[#142238] lg:flex flex-col ">
            {/* Logo */}
            <div className="p-4 text-lg font-bold border-b border-gray-700 bg-[#183756] h-24">
              <Link
                to={`${import.meta.env.VITE_PUBLIC_PAGE}`}
                className="w-1/2 md:w-1/4"
              >
                <img src={logo} alt="SR DREAM IT Logo" className="w-full " />
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 bg-[#132949] text-sm  text-gray-200 flex justify-center">
              <nav className=" mx-auto flex flex-col items-start p-2 mt-5 text-base">
                <Link
                  className="block p-2 rounded hover:bg-[#1f2e48]"
                  to="/admin"
                >
                  Admin Panel
                </Link>

                {/* Students Management */}
                <button
                  onClick={() => setOpenStudent(!openStudent)}
                  className="flex justify-center gap-3 items-center w-full p-2 hover:bg-[#1f2e48] rounded"
                >
                  Students Management{" "}
                  <FaChevronRight
                    className={`transition ${openStudent ? "rotate-90" : ""}`}
                  />
                </button>
                {openStudent && (
                  <div className="pl-4">
                    <Link
                      className="block p-2 hover:bg-[#1f2e48] rounded"
                      to="/add-student"
                    >
                      Add Student
                    </Link>
                    <Link
                      className="block p-2 hover:bg-[#1f2e48] rounded"
                      to="/student"
                    >
                      View Student
                    </Link>
                    <Link
                      className="block p-2 hover:bg-[#1f2e48] rounded"
                      to="/certificate"
                    >
                      Certificates Manage
                    </Link>
                  </div>
                )}

                {/* Other Links */}
                <Link
                  className="block p-2 rounded hover:bg-[#1f2e48]"
                  to="/courses"
                >
                  Courses
                </Link>
                <Link
                  className="block p-2 rounded hover:bg-[#1f2e48]"
                  to="/payment"
                >
                  Payment Reports
                </Link>

                {/* Team Members */}
                <button
                  onClick={() => setOpenTeam(!openTeam)}
                  className="flex justify-between items-center w-full p-2 hover:bg-[#1f2e48] rounded"
                >
                  Team Members{" "}
                  <FaChevronRight
                    className={`transition ${openTeam ? "rotate-90" : ""}`}
                  />
                </button>
                {openTeam && (
                  <div className="pl-4">
                    <Link
                      className="block p-2 hover:bg-[#1f2e48] rounded"
                      to="/add-member"
                    >
                      Add Member
                    </Link>
                    <Link
                      className="block p-2 hover:bg-[#1f2e48] rounded"
                      to="/view-member"
                    >
                      View Member
                    </Link>
                  </div>
                )}

                <Link
                  className="block p-2 rounded hover:bg-[#1f2e48]"
                  to="/notice"
                >
                  Notice Board
                </Link>

                {/* Admin */}
                <Link
                  className="block p-2 rounded hover:bg-[#1f2e48]"
                  to="/password-reset"
                >
                  Change Password
                </Link>
                <Link
                 onClick={handleLogout}
                  className="block p-2 rounded hover:bg-[#1f2e48]"
                  to="/logout"
                >
                  Logout
                </Link>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Area */}
        <div className="flex-1 flex flex-col ">
          {/* Header */}
          <header className="bg-[#132949] h-24  p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2 relative">
              <span
                onClick={toggleNavbar}
                className={`text-xl cursor-pointer transition-transform duration-500 ease-in-out transform isOpen ? "translate-y-0" : "translate-y-full"`}
              >
                <GiHamburgerMenu />
              </span>

              <input
                type="text"
                placeholder="Search here"
                className="bg-[#183756] ml-4 px-3 py-2 rounded outline-none text-white placeholder-white"
              />
              <button className="absolute top-3 right-4 text-gray-400">
                <IoMdSearch />
              </button>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <FaBell className="text-xl  cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                  0
                </span>
              </div>
              <div className="flex items-center gap-4 mr-5">
                <div className="text-right text-sm leading-tight">
                  <div>{data?.name}</div>
                  <div className="">Admin</div>
                </div>
                <ProfileIcon></ProfileIcon>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1  overflow-y-auto w-full">
            <div className="lg:w-[45%] mx-auto rounded-lg  text-[20px] lg:text-[32px] font-bold bg-[#0052CC] text-white my-[15px] p-3">
              {greeting}, <strong> Admin 👋</strong>
            </div>
            <div className="bg-[#132949] border border-[#00B5FF] rounded-lg p-6 my-3 mx-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* old version  */}

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SideNav;
