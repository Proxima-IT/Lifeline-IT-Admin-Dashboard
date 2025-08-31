import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const UploadRecordedClass = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = (data) => {
    // data.instructor = instructor;
    console.log(data);
    // axios
    //   .post(`${import.meta.env.VITE_API_URL}/api/courses/add`, data)
    //   .then((res) => {
    //     console.log(res.data);
    //     toast.success("Course added successfully", {
    //       position: "top-center",
    //       autoClose: 3000,
    //       theme: "dark",
    //     });
    //     reset();
    //     setTimeout(() => {
    //       navigate("/courses");
    //     }, 3000);
    //   });
  };
  return (
    <div>
      <main className="flex-1  overflow-y-auto w-full">
        <div className="flex justify-center px-10 mb-3 mt-5">
          <Link to="/add-courses">
            <button className="bg-[#F15B27] px-2 lg:px-3 text-sm lg:text-lg py-2 rounded-md text-white flex justify-center items-center gap-3">
              <FaPlus />
              Upload Recorded Class
            </button>
          </Link>
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-10 my-3 mx-4 lg:mx-10">
          <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto mt-5">
            <div className="lg:grid lg:grid-cols-2 gap-3">
              {/* Course Type */}
              <div className="mb-2">
                <label
                  htmlFor="onlineCourseName"
                  className="block text-base font-medium text-left text-gray-50 mb-2"
                >
                  Course Type <span className="text-red-600">*</span>
                </label>

                <select
                  {...register("onlineCourseName", {
                    required: true,
                  })}
                  className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                >
                  <option value="">Choose a Course</option>
                  <option value="Graphic Design">Graphic Design</option>
                </select>
              </div>
              {/* Course Name */}
              <div className="mb-2">
                <label
                  htmlFor="onlineCourseName"
                  className="block text-base font-medium text-left text-gray-50 mb-2"
                >
                  Course Name <span className="text-red-600">*</span>
                </label>

                <select
                  {...register("onlineCourseName", {
                    required: true,
                  })}
                  className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                >
                  <option value="">Choose a Course</option>
                  <option value="Graphic Design">Graphic Design</option>
                </select>
              </div>

              {/* Course Title */}
              <div className="mb-2">
                <label
                  htmlFor="batchNumber"
                  className="block text-base font-medium text-left text-gray-50 mb-2"
                >
                  Class Title <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  id="batchNumber"
                  {...register("batchNumber")}
                  placeholder=""
                  className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                />
              </div>

              {/* Course Number */}
              <div className="mb-2">
                <label
                  htmlFor="batchNumber"
                  className="block text-base font-medium text-left text-gray-50 mb-2"
                >
                  Class Number <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  id="batchNumber"
                  {...register("batchNumber")}
                  placeholder=""
                  className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                />
              </div>

              {/* Course Number */}
              <div className="mb-2">
                <label
                  htmlFor="batchNumber"
                  className="block text-base font-medium text-left text-gray-50 mb-2"
                >
                  Class Video Link <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  id="batchNumber"
                  {...register("batchNumber")}
                  placeholder=""
                  className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                />
              </div>

              {/* Resource / Notes Title */}
              <div className="mb-2">
                <label
                  htmlFor="batchNumber"
                  className="block text-base font-medium text-left text-gray-50 mb-2"
                >
                  Resource / Notes Title
                </label>

                <input
                  type="text"
                  id="batchNumber"
                  {...register("batchNumber")}
                  placeholder=""
                  className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                />
              </div>

              {/* Resource / Notes Title */}
              <div className="mb-2">
                <label
                  htmlFor="batchNumber"
                  className="block text-base font-medium text-left text-gray-50 mb-2"
                >
                  Resource / Notes Links
                </label>

                <input
                  type="text"
                  id="batchNumber"
                  {...register("batchNumber")}
                  placeholder=""
                  className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                />
              </div>

              <div></div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm text-left font-medium text-white"
                >
                  Class Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  {...register("description", { required: true })}
                  placeholder="Enter course description"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                ></textarea>
              </div>
              <div></div>

              <label className="flex items-center space-x-2 cursor-pointer col-span-2">
                <input
                  type="checkbox"
                  // checked="false"
                  onChange={(e) => setNotify(e.target.checked)}
                  className="h-4 w-4 accent-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                />
                <span className="text-[#F6EB16]">
                  New Recorded Class has been added to your course. Please check
                  your dashboard.
                </span>
              </label>
            </div>

            <input
              type="submit"
              value="Submit"
              className="w-full lg:w-1/4 mx-auto lg:col-span-3 bg-[#1E489F] mt-10 rounded-md px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer"
            />
            <button className="w-full lg:w-1/4 mx-auto lg:col-span-3 bg-[#1E489F] mt-10 rounded-md px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer ml-4">
              Save & Update
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadRecordedClass;
