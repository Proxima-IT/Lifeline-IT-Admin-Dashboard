import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";

const abc = () => {
  return (
    <div>
      {/* <!-- Navigation --> */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 px-4">
          {/* <Link
            to={`${import.meta.env.VITE_PUBLIC_PAGE}`}
            className="w-1/2 md:w-1/4"
          >
            <img
              src={logo}
              alt="SR DREAM IT Logo"
              className="w-full lg:w-1/2"
            />
          </Link> */}

          <div
            className="text-[#0B254C] text-2xl lg:hidden flex justify-end"
            onClick={toggleNavbar}
          >
            <AiOutlineMenuFold/>
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
    </div>
  );
};

export default abc;
