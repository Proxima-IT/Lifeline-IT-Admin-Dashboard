import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const UpdateStudents = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("paid");

  // online or offline mode state
  const [mode, setMode] = useState("online"); // default online
  const {
    register,
    unregister,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/courses`).then((res) => {
      console.log(res.data);
      setCourses(res.data);
      setPaymentStatus("paid")
    });
  }, []);

  // unregister inactive fields
  useEffect(() => {
    if (mode === "online") {
      unregister([
        "offlineCourseAccess",
        "offlineCourseDuration",
        "offlineSession",
        "year",
        "admissionDate",
        "batchNumber",
        "courseFee",
        "due",
        "paymentStatus",
      ]);
    } else {
      unregister(["onlineCourseName", "onlineCourseDuration", "onlineSession"]);
    }
  }, [mode, unregister]);

  // async function uploadImage(file) {
  //   setLoading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append("profileImage", file); // multer route এ যেই নাম দিচ্ছো সেটাই দিতে হবে

  //     const res = await axios.post(
  //       `${import.meta.env.VITE_API_URL_STUDENT}/students`, // 🔹 ধরে নিলাম তুমি upload endpoint আলাদা করে রেখেছো
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     console.log("image:", res);
  //     if (res.data?.filePath || res.data?.url) {
  //       setUploadedImageUrl(res.data.filePath || res.data.url);
  //       console.log("Image uploaded:", res.data);
  //     } else {
  //       console.error("Upload failed: No path returned");
  //     }
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const formData = new FormData();

      // Append text fields
      Object.keys(data).forEach((key) => {
        if (key !== "profileImage") {
          formData.append(key, data[key]);
        }
      });

      // Append selected mode
      formData.append("mode", mode);

      // Append file if exists
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_STUDENT}/students`, // ✅ template string
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Student saved successfully", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      reset();
      setUploadedImageUrl("");
      console.log("Student created:", res.data);
    } catch (err) {
      console.error("Error creating student:", err);
      toast.error("Failed to save student", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <main className="flex-1  overflow-y-auto w-full">
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-[80%] lg:w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md ">
          Student Profile
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-lg p-3 lg:p-6 my-3 mx-5 lg:mx-10">
          {/* // main dynamic content goes here */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col-reverse lg:flex-row mt-5 justify-around w-full">
              <div>
                {/* Personal Information  */}
                <h2 className="text-[#00FFFF] text-xl my-4">
                  Personal Information
                </h2>
                <div className="lg:grid lg:grid-cols-2 gap-3">
                  {/* Student Name */}
                  <div className="mb-2">
                    <label
                      htmlFor="studentName"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Student Name <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      id="studentName"
                      {...register("studentName", { required: true })}
                      placeholder="Enter Student Name"
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>
                  {/* father Name */}
                  <div className="mb-2">
                    <label
                      htmlFor="fathersName"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Father’s Name <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      id="fathersName"
                      {...register("fathersName", { required: true })}
                      placeholder="Enter Father's Name"
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Mother's Name */}
                  <div className="mb-2">
                    <label
                      htmlFor="mothersName"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Mother’s Name <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      id="mothersName"
                      {...register("mothersName", { required: true })}
                      placeholder="Enter Mother’s Name"
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>
                  {/*  Date of Birth */}
                  <div className="mb-2">
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Date of Birth <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="date"
                      id="dateOfBirth"
                      {...register("dateOfBirth", { required: true })}
                      placeholder="Enter Date of Birth"
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>
                  {/*  Gender */}
                  <div className="mb-2">
                    <label
                      htmlFor="gender"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Gender <span className="text-red-600">*</span>
                    </label>

                    <select
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* E-mail Address */}
                  <div className="mb-2">
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      E-mail Address <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: true })}
                      placeholder="Enter E-mail Address"
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* mobile number */}
                  <div className="mb-2">
                    <label
                      htmlFor="mobileNumber"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Mobile Number <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      id="mobileNumber"
                      {...register("mobileNumber", { required: true })}
                      placeholder="Enter Mobile Number"
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* offline or online course based field rendering  */}

                <div className="py-10 text-white rounded-xl space-y-4">
                  {/* Radio Buttons */}
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="courseMode"
                        value="online"
                        checked={mode === "online"}
                        onChange={() => setMode("online")}
                        className="accent-blue-500 h-4 w-4"
                      />
                      <span
                        className={
                          mode === "online" ? "text-blue-400" : "text-gray-300"
                        }
                      >
                        Online
                      </span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="courseMode"
                        value="offline"
                        checked={mode === "offline"}
                        onChange={() => setMode("offline")}
                        className="accent-orange-500 h-4 w-4"
                      />
                      <span
                        className={
                          mode === "offline"
                            ? "text-orange-400"
                            : "text-gray-300"
                        }
                      >
                        Offline
                      </span>
                    </label>
                  </div>

                  {/* Conditional Form Divs */}
                  <div className="mt-4">
                    {mode === "online" ? (
                      <div className="  rounded-lg">
                        {/* online course details  */}
                        <h2 className="text-[#00FFFF] text-xl my-4">
                          Course Details
                        </h2>
                        <div className="lg:grid lg:grid-cols-2 gap-3">
                          {/* Course Name */}
                          <div className="mb-2">
                            <label
                              htmlFor="onlineCourseName"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Course Name{" "}
                            </label>

                            <select
                              {...register("onlineCourseName", {
                                required: true,
                              })}
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            >
                              <option value="">Choose a Course</option>
                              <option value="Graphic Design">
                                Graphic Design
                              </option>
                            </select>
                          </div>

                          {/* Course Duration */}
                          <div className="mb-2">
                            <label
                              htmlFor="onlineCourseDuration"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Course Duration
                            </label>

                            <select
                              {...register("onlineCourseDuration")}
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            >
                              <option value="">Choose Course Duration</option>
                              <option value="3 months">3 months</option>
                            </select>
                          </div>

                           {/* Course session */}
                          <div className="mb-2">
                            <label
                              htmlFor="offlineSession"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Session
                            </label>

                            <select
                              {...register("offlineSession")}
                              onChange={(e) =>
                                setShowOther(e.target.value === "Others")
                              }
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            >
                              <option value="">Choose Session</option>
                              <option value="January-March">
                                January-March
                              </option>
                              <option value="April-June">April-June</option>
                              <option value="January-June">January-June</option>
                              <option value="July-October">July-October</option>
                              <option value="September-December">
                                September-December
                              </option>
                              <option value="July-December">
                                July-December
                              </option>
                              <option value="Others">Others</option>
                            </select>

                            {/* Extra text field for Others */}
                            {showOther && (
                              <input
                                type="text"
                                {...register("offlineSessionOther")}
                                placeholder="Write your session..."
                                className="mt-2 bg-[#8995A3] placeholder-white block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className=" rounded-lg">
                        {/* offline course details  */}
                        <h2 className="text-[#00FFFF] text-xl my-4">
                          Course Details
                        </h2>
                        <div className="lg:grid lg:grid-cols-2 gap-3">
                          {/* Course Title */}
                          <div className="mb-2">
                            <label
                              htmlFor="offlineCourseAccess"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Offline Course Access{" "}
                              <span className="text-red-600">*</span>
                            </label>

                            <select
                              {...register("offlineCourseAccess", {
                                required: true,
                              })}
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            >
                              <option value="">Choose a Course</option>
                              <option value="Lab Access">Lab Access</option>
                            </select>
                          </div>

                          {/* Course Duration */}
                          <div className="mb-2">
                            <label
                              htmlFor="offlineCourseDuration"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Course Duration
                            </label>

                            <select
                              {...register("offlineCourseDuration")}
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            >
                              <option value="">Choose Course Duration</option>
                              <option value="3 months">1 month</option>
                              <option value="3 months">2 month</option>
                              <option value="3 months">3 month</option>
                              <option value="3 months">4 month</option>
                              <option value="3 months">5 month</option>
                              <option value="3 months">6 month</option>
                              <option value="3 months">1 year</option>
                            </select>
                          </div>

                     
                          {/* Course session */}
                          <div className="mb-2">
                            <label
                              htmlFor="offlineSession"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Session
                            </label>

                            <select
                              {...register("offlineSession")}
                              onChange={(e) =>
                                setShowOther(e.target.value === "Others")
                              }
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            >
                              <option value="">Choose Session</option>
                              <option value="January-March">
                                January-March
                              </option>
                              <option value="April-June">April-June</option>
                              <option value="January-June">January-June</option>
                              <option value="July-October">July-October</option>
                              <option value="September-December">
                                September-December
                              </option>
                              <option value="July-December">
                                July-December
                              </option>
                              <option value="Others">Others</option>
                            </select>

                            {/* Extra text field for Others */}
                            {showOther && (
                              <input
                                type="text"
                                {...register("offlineSessionOther")}
                                placeholder="Write your session..."
                                className="mt-2 bg-[#8995A3] placeholder-white block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                              />
                            )}
                          </div>

                          {/* Course year */}
                          <div className="mb-2">
                            <label
                              htmlFor="year"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Year
                            </label>

                            <select
                              {...register("session")}
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
                              htmlFor="admissionDate"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Admission Date
                            </label>

                            <input
                              type="date"
                              id="admissionDate"
                              {...register("admissionDate")}
                              placeholder="Enter Admission Date"
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            />
                          </div>

                          {/* Bath Number */}
                          <div className="mb-2">
                            <label
                              htmlFor="batchNumber"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Batch Number
                            </label>

                            <input
                              type="text"
                              id="batchNumber"
                              {...register("batchNumber")}
                              placeholder="Enter Batch Number"
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            />
                          </div>

                          {/* Course Fee */}
                          <div className="mb-2">
                            <label
                              htmlFor="courseFee"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Course Fee <span className="text-red-600">*</span>
                            </label>

                            <input
                              type="text"
                              id="courseFee"
                              {...register("courseFee", { required: true })}
                              placeholder=""
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            />
                          </div>

                          {/* DUE */}
                          <div className="mb-2">
                            <label
                              htmlFor="due"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Due
                            </label>

                            <input
                              type="text"
                              id="due"
                              {...register("due")}
                              placeholder="Due Amount"
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            />
                          </div>

                          {/* Payment Status */}
                          <div className="mb-2">
                            <label
                              htmlFor="paymentStatus"
                              className="block text-base font-medium text-left text-gray-50 mb-2"
                            >
                              Payment Status
                            </label>

                            <input
                              type="text"
                              id="paymentStatus"
                              {...register("paymentStatus")}
                              defaultValue={paymentStatus === "paid" ? "paid": "due"}
                              placeholder="Auto Status Fill"
                              className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                            />
                          </div>
                          <div></div>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              // checked="false"
                              {...register("notify")}
                              className="h-4 w-4 accent-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                            />
                            <span className="text-white">
                              Notify via SMS or Email
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Result details  */}
                <h2 className="text-[#00FFFF] text-xl my-4">Result Update</h2>
                <div className="lg:grid lg:grid-cols-2 gap-3">
                  {/* Marks */}
                  <div className="mb-2">
                    <label
                      htmlFor="marks"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Marks
                    </label>

                    <input
                      type="text"
                      id="marks"
                      {...register("marks")}
                      placeholder=""
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Grade */}
                  <div className="mb-2">
                    <label
                      htmlFor="grade"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Grade
                    </label>

                    <select
                      {...register("grade")}
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    >
                      <option value="">Choose Grade</option>

                      <option value="Morning">A+</option>
                      <option value="Morning">A</option>
                      <option value="Morning">A-</option>
                      <option value="Morning">F</option>
                    </select>
                  </div>

                  {/* Certificate Issue Date */}
                  <div className="mb-2">
                    <label
                      htmlFor="certificateIssueDate"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Certificate Issue Date
                    </label>

                    <input
                      type="text"
                      id="certificateIssueDate"
                      {...register("certificateIssueDate")}
                      placeholder=""
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Status */}
                  <div className="mb-2">
                    <label
                      htmlFor="status"
                      className="block text-base font-medium text-left text-gray-50 mb-2"
                    >
                      Status
                    </label>

                    <select
                      {...register("status")}
                      className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                    >
                      <option value="">Choose Status</option>

                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-4/12">
                {/* Profile Image */}
                <div className="w-full  flex flex-col items-center">
                  {loading ? (
                    <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-blue-500">
                      <span className="loader"></span>
                    </div>
                  ) : (
                    <img
                      src={
                        uploadedImageUrl || "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                    />
                  )}
                  <h1 className="mt-3">Upload Photo</h1>
                  <label
                    htmlFor="profileImage"
                    className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-black font-medium py-2 px-3 mt-4 rounded-lg shadow flex items-center gap-2"
                  >
                    <FaUpload /> Choose File
                  </label>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    {...register("profileImage")}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setUploadedImageUrl(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }
                    }}
                  />
                </div>
                {/* <span className="mt-2 text-xs">
                         Please upload a recent passport size photo (300x300 pixels,
                         max 200 KB, JPEG/PNG).
                       </span> */}

                {/* <input type="hidden" name="image" value={uploadedImageUrl} /> */}
              </div>
            </div>

            <input
              type="submit"
              value="Update & Save"
              className="w-full lg:w-1/3 mx-auto lg:col-span-3 bg-[#0052CC] mt-10 rounded-md px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer"
            />
          </form>
        </div>
      </main>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default UpdateStudents;
