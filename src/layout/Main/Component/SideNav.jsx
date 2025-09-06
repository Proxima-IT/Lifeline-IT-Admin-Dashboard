import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../../assets/Website Logo.png";

import IconButton from "@mui/material/IconButton";

import axios from "axios";

import { IoIosPaper, IoMdClose, IoMdLock, IoMdSearch } from "react-icons/io";

import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
// import { toast, ToastContainer } from "react-toastify"
import { GiHamburgerMenu } from "react-icons/gi";
import { useDashboard } from "../../../hooks/useDashboard";
import { ProfileIcon } from "./ProfileIcon";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FaBell, FaChevronRight } from "react-icons/fa";

const SideNav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openRecordedClass, setOpenRecordedClass] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const searchRef = useRef(null); // 👈 Add this

  const { data, isLoading, error } = useDashboard();

  // for large device
  const toggleNavbar = () => setIsOpen(!isOpen);

  // for small device
  const toggleMenubar = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // for small device

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMobileSearchOpen(false); // 👈 Close search
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setTimeout(async () => {
      await axios.get(import.meta.env.VITE_API_URL + `/api/auth/logout`, {
        withCredentials: true,
      });
      window.location.href = import.meta.env.VITE_PUBLIC_PAGE;
    }, 2000);

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

  const handleClick = () => {
    // navigate("/our-courses");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // delay to ensure page loads
  };

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 w-full min-h-screen bg-[#0E2035] text-white ">
        {/* Sidebar */}

        {isOpen && (
          <aside className="col-span-3 bg-[#142238] lg:flex flex-col hidden">
            {/* Logo */}
            <div className="p-4 text-lg font-bold border-b border-gray-700 bg-[#183756] lg:h-24 md:h-[20%]">
              <Link
                to={`${import.meta.env.VITE_PUBLIC_PAGE}`}
                className="w-1/2 md:w-1/4"
              >
                <img
                  src={logo}
                  alt="SR DREAM IT Logo"
                  className="w-full md:w-1/2 lg:w-full"
                />
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 bg-[#132949] text-sm  text-gray-200 flex justify-center">
              <nav className=" mx-auto flex flex-col items-start p-2 mt-5 text-base">
                <NavLink
                  onClick={handleClick}
                  className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                  to="/admin"
                >
                  Admin Panel
                </NavLink>

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
                    {/* <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full "
                      to="/add-student"
                    >
                      Add Student
                    </NavLink> */}
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full "
                      to="/student"
                    >
                      View Student
                    </NavLink>
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full "
                      to="/certificate"
                    >
                      Certificates Manage
                    </NavLink>
                  </div>
                )}

                {/* Other Links */}
                <NavLink
                  className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                  to="/courses"
                >
                  Courses
                </NavLink>

                {/* Class Management */}
                <button
                  onClick={() => setOpenRecordedClass(!openRecordedClass)}
                  className="flex justify-between items-center w-full p-2 hover:bg-[#1f2e48] rounded"
                >
                  Class Management{" "}
                  <FaChevronRight
                    className={`transition ${openRecordedClass ? "rotate-90" : ""}`}
                  />
                </button>
                {openRecordedClass && (
                  <div className="pl-4">
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                      to="/uploadClass"
                    >
                      Upload Recorded Class
                    </NavLink>
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                      to="/viewClass"
                    >
                      View All Recorded Class
                    </NavLink>
                  </div>
                )}
                <NavLink
                  className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                  to="/payment"
                >
                  Payment Reports
                </NavLink>

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
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                      to="/add-member"
                    >
                      Add Member
                    </NavLink>
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                      to="/view-member"
                    >
                      View Member
                    </NavLink>
                  </div>
                )}

                <NavLink
                  className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                  to="/notice"
                >
                  Notice Board
                </NavLink>

                {/* Admin */}

                <h1 className="text-yellow-500 mt-3  w-full text-left">
                  Admin
                </h1>

                <NavLink
                  className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                  to="/password-reset"
                >
                  Change Password
                </NavLink>
                <Link
                  onClick={handleLogout}
                  className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                  to=""
                >
                  Logout
                </Link>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Area */}
        <div
          className={`flex-1 flex flex-col ${
            isOpen ? "col-span-9" : "col-span-12"
          }`}
        >
          {/* Header */}
          <header className="bg-[#132949] h-24  p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2 relative">
              {/* menu bar for large device */}
              <span
                onClick={toggleNavbar}
                className={`hidden lg:block text-xl cursor-pointer transition-transform duration-500 ease-in-out transform isOpen ? "translate-y-0" : "translate-y-full"`}
              >
                <GiHamburgerMenu />
              </span>

              {/* menu bar for small device */}
              {/* Mobile Nav Toggle */}
              <div
                className="text-white text-2xl lg:hidden hover:text-blue-500"
                onClick={toggleMenubar}
              >
                <AiOutlineMenuUnfold />
              </div>
              {isMobileMenuOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              )}

              {/* Mobile Drawer */}
              <div
                className={`fixed z-50 top-0 left-0 h-screen pb-12 overflow-auto lg:hidden w-9/12 bg-gradient-to-b from-[#0B254C] via-[#348fd1] to-[#072043]  shadow-lg transition-transform duration-500 ease-in-out transform ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                {/* Drawer Header */}
                <div className="w-full flex items-center justify-between px-4">
                  <Link
                    to="/"
                    className="text-lg font-semibold text-sky-700 flex items-center gap-x-2"
                  >
                    <img src={logo} alt="" className="w-5/6 md:w-1/3" />
                  </Link>
                  <div className="lg:hidden flex justify-end py-6">
                    <button
                      onClick={toggleMenubar}
                      className="text-gold focus:outline-none"
                    >
                      <IoMdClose size={28} />
                    </button>
                  </div>
                </div>

                <div className="border-b border-[#9fe9ff88]"></div>

                <nav
                  onClick={() => setIsMobileMenuOpen(false)}
                  className=" mx-auto flex flex-col items-start p-2 mt-5 text-base"
                >
                  <NavLink
                    onClick={handleClick}
                    
                    className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                    to="/admin"
                  >
                    Admin Panel
                  </NavLink>

                  {/* Students Management */}
                  <button
                    onClick={() => setOpenStudent(!openStudent)}
                    className="flex justify-start text-left gap-3 items-center w-full p-2 hover:bg-[#1f2e48] rounded "
                  >
                    Students Management{" "}
                    <FaChevronRight
                      className={`transition ${openStudent ? "rotate-90" : ""}`}
                    />
                  </button>
                  {openStudent && (
                    <div className="pl-4">
                      <NavLink
                        className="block p-2 hover:bg-[#1f2e48] rounded w-full "
                        to="/add-student"
                      >
                        Add Student
                      </NavLink>
                      <NavLink
                        className="block p-2 hover:bg-[#1f2e48] rounded w-full "
                        to="/student"
                      >
                        View Student
                      </NavLink>
                      <NavLink
                        className="block p-2 hover:bg-[#1f2e48] rounded w-full "
                        to="/certificate"
                      >
                        Certificates Manage
                      </NavLink>
                    </div>
                  )}

                  {/* Other Links */}
                  <NavLink
                    className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                    to="/courses"
                  >
                    Courses
                  </NavLink>


                   {/* Class Management */}
                <button
                  onClick={() => setOpenRecordedClass(!openRecordedClass)}
                  className="flex justify-between items-center w-full p-2 hover:bg-[#1f2e48] rounded"
                >
                  Class Management{" "}
                  <FaChevronRight
                    className={`transition ${openRecordedClass ? "rotate-90" : ""}`}
                  />
                </button>
                {openRecordedClass && (
                  <div className="pl-4">
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                      to="/uploadClass"
                    >
                      Upload Recorded Class
                    </NavLink>
                    <NavLink
                      className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                      to="/viewClass"
                    >
                      View All Recorded Class
                    </NavLink>
                  </div>
                )}
                  <NavLink
                    className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                    to="/payment"
                  >
                    Payment Reports
                  </NavLink>

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
                      <NavLink
                        className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                        to="/add-member"
                      >
                        Add Member
                      </NavLink>
                      <NavLink
                        className="block p-2 hover:bg-[#1f2e48] rounded w-full text-left"
                        to="/view-member"
                      >
                        View Member
                      </NavLink>
                    </div>
                  )}

                  <NavLink
                    className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                    to="/notice"
                  >
                    Notice Board
                  </NavLink>

                  {/* Admin */}
                  <NavLink
                    className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                    to="/password-reset"
                  >
                    Change Password
                  </NavLink>
                  <Link
                    onClick={handleLogout}
                    className="block p-2 rounded hover:bg-[#1f2e48] w-full text-left"
                    to=""
                  >
                    Logout
                  </Link>
                </nav>
              </div>

              {/* Mobile Search Icon + Floating Search Bar */}
              {/* Mobile Search Trigger */}
              <div className="md:hidden">
                <IconButton
                  sx={{ p: "10px", color: "white", marginLeft: "5px" }}
                  aria-label="search"
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                >
                  <SearchIcon />
                </IconButton>
              </div>

              {/* Floating Full-Width Search Bar */}
              {mobileSearchOpen && (
                <div
                  ref={searchRef}
                  className="fixed transition-all duration-200 top-20 left-0 right-0 z-50 px-4 w-[80%] mx-auto"
                >
                  <Paper
                    component="form"
                    // onSubmit={handleSearch}
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search here..."
                      // value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <IconButton type="submit" sx={{ p: "10px" }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
              )}

              <input
                type="text"
                placeholder="Search here"
                className="bg-[#183756] hidden md:block ml-4 px-3 py-2 rounded outline-none text-white placeholder-white"
              />
              <button className="absolute top-3 right-4 text-gray-400 hidden md:block">
                <IoMdSearch />
              </button>
            </div>

            {/* bell icon  */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <FaBell className="text-xl  cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                  0
                </span>
              </div>

              {/* admin info  */}
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
          <Outlet />
        </div>
      </div>

      {/* old version  */}

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SideNav;
