import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

const AddStudent = () => {
   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/courses`).then((res) => {
      console.log(res.data);
      setCourses(res.data);
    });
  }, []);


   async function uploadImage(file) {
    setLoading(true);

    try {
      const compressedBlob = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const originalExtension = file.name.split(".").pop();
      const fileName = `${data.sid}-${data.name
        .split(" ")
        .join("_")}.${originalExtension}`;

      const compressedFile = new File([compressedBlob], fileName, {
        type: compressedBlob.type,
      });

      const formData = new FormData();
      formData.append("image", compressedFile); // ✅ now it's a File with correct name

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await res.json();

      if (responseData?.data?.url) {
        setUploadedImageUrl(responseData.data.url);
        console.log("Image URL:", responseData.data.url);
      } else {
        console.error("Upload failed: No URL returned");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (data) => {
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
    //     navigate("/courses");
    //   });
  };
  return (
    <div>
      <main className="flex-1  overflow-y-auto w-full">
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          Add New Student
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-lg p-6 my-3 mx-10">
          {/* // main dynamic content goes here */}
          <h2 className="text-[#00FFFF] text-xl">Course Details</h2>
          <div className="flex mt-5 justify-around">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3">
                {/* Course Title */}
                <div className="mb-2">
                  <label
                    htmlFor="title"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Course Name <span className="text-red-600">*</span>
                  </label>

                  <select
                    {...register("courseName", { required: true })}
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  >
                    <option value="">Choose a Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course Duration */}
                <div className="mb-2">
                  <label
                    htmlFor="duration"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Course Duration <span className="text-red-600">*</span>
                  </label>

                  <select
                    {...register("duration", { required: true })}
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  >
                    <option value="">Choose Course Duration</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.duration}>
                        {course.duration}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course session */}
                <div className="mb-2">
                  <label
                    htmlFor="session"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Session <span className="text-red-600">*</span>
                  </label>

                  <select
                    {...register("session", { required: true })}
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  >
                    <option value="">Choose Session</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.duration}>
                        {course.duration}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course year */}
                <div className="mb-2">
                  <label
                    htmlFor="year"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Year <span className="text-red-600">*</span>
                  </label>

                  <select
                    {...register("session", { required: true })}
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  >
                    <option value="">Choose Year</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.duration}>
                        {course.duration}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Admission Date */}
                <div className="mb-2">
                  <label
                    htmlFor="date"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Admission Date <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="date"
                    id="date"
                    {...register("date", { required: true })}
                    placeholder="Enter Admission Date"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* Bath Number */}
                <div className="mb-2">
                  <label
                    htmlFor="batch"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Batch Number <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="batch"
                    {...register("batch", { required: true })}
                    placeholder="Enter Batch Number"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* Course Fee */}
                <div className="mb-2">
                  <label
                    htmlFor="fee"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Course Fee <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="fee"
                    {...register("fee", { required: true })}
                    placeholder="Enter Batch Number"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* DUE */}
                <div className="mb-2">
                  <label
                    htmlFor="due"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Due <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="due"
                    {...register("due", { required: true })}
                    placeholder="Due Amount"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* Payment Status */}
                <div className="mb-2">
                  <label
                    htmlFor="status"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Payment Status <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="status"
                    {...register("status", { required: true })}
                    placeholder="Auto Status Fill"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </form>

            <div>
               {/* Profile Picture */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <h3 className="mb-2">Photo Upload</h3>
            {loading ? (
              // Spinner shown while uploading
              <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-blue-500 shadow">
                <span class="loader"></span>
              </div>
            ) : (
              <img
                src={uploadedImageUrl || "https://ibb.co.com/X2LDnpf"}
                alt="Photo"
                className="w-32 h-32  object-cover border-4 border-blue-500 shadow"
              />
            )}        

            <div className="mt-4">
              <label
                htmlFor="imageUpload"
                className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg shadow transition duration-200 flex items-center gap-2"
              >
                <FaUpload /> Choose File
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    uploadImage(file);
                  }
                }}
                className="hidden"
              />
            </div>
            <input
              type="hidden"
              name="image"
              value={uploadedImageUrl}
            />
          </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddStudent;
