import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/courses`).then((res) => {
      console.log(res.data);
      setCourses(res.data);
    });
  }, []);

  const handleDelete = (route) => {
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
          .delete(`${import.meta.env.VITE_API_URL}/api/courses/delete/${route}`)
          .then(
            Swal.fire({
              title: "Deleted!",
              text: "Your Course has been deleted.",
              icon: "success",
            })
          );
      }
    });
  };

  return (
    <div>
      {/* <!-- Main Content --> */}
      <main class="flex-1 my-5 p-3">
        <div class="">
          <div className="flex justify-between">
            <h2 class="lg:text-2xl text-lg font-bold mb-4 text-left text-[#0b2a53]">
              All Courses
            </h2>
            <Link to="/add-courses">
              <button className="bg-[#0b2a53] px-2 lg:px-3 text-sm lg:text-lg py-2 rounded-md text-white flex items-center gap-3">
                <FaPlus />
                Add New Course
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden mx-auto flex flex-col gap-6  items-center justify-center"
              >
                <img
                  src={course.thumbnail}
                  alt=""
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {course.title}
                  </h2>

                  <div className="flex items-center justify-center mt-5 text-sm mx-auto gap-3">
                    {/* <Link to={`/courses/${course.route}`}>
                      <button className="bg-[#b96c16] px-3 py-2 rounded-md text-white flex items-center gap-3">
                        View
                      </button>
                    </Link> */}
                    <Link to={`/courses/update/${course.route}`}>
                      <button className="m-2 px-[22px] py-[8px] text-center uppercase transition-all duration-500 bg-[linear-gradient(to_right,_#249ffd_2%,_#3a7bd5_58%,_#00d2ff_100%)] bg-[length:200%_auto] text-white shadow-[0_0_15px_#fff] rounded-[10px]  hover:bg-[position:right_center] hover:text-white flex items-center  gap-3 font-bold">
                        View Course 
                      </button>
                    </Link>

                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
