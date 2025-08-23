import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import imageCompression from 'browser-image-compression';

const AddMember = () => {
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
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-[80%] lg:w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          Add New Member
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-6 my-3 mx-4 lg:mx-10">
          {/* // main dynamic content goes here */}

          <div>
            {/* course details  */}
            <h2 className="text-[#00FFFF] text-xl mb-4">Member Information</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col-reverse lg:flex-row mt-5 justify-around w-full"
            >
              <div className="lg:grid lg:grid-cols-2 gap-3">
                {/* Course Title */}
                <div className="mb-2">
                  <label
                    htmlFor="name"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    placeholder="Enter Full Name"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* Father's Name */}
                <div className="mb-2">
                  <label
                    htmlFor="father"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Father's Name <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="father"
                    {...register("father", { required: true })}
                    placeholder="Enter Father's Name"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* Mother's Name */}
                <div className="mb-2">
                  <label
                    htmlFor="mother"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Mother's Name <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="mother"
                    {...register("mother", { required: true })}
                    placeholder="Enter Mother's Name"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/*  Date of Birth */}
                <div className="mb-2">
                  <label
                    htmlFor="mother"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Date of Birth <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="date"
                    id="mother"
                    {...register("dob", { required: true })}
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {/*  Educational Information */}
                <div className="mb-2">
                  <label
                    htmlFor="educationalInfo"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Educational Information{" "}
                    <span className="text-red-600">*</span>
                  </label>

                  <select
                    {...register("educationalInfo", {
                      required: "Gender is required",
                    })}
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  >
                    <option value="">Select Educational Information</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* mobile number */}
                <div className="mb-2">
                  <label
                    htmlFor="mobile"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Mobile Number <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="mobile"
                    {...register("mobile", { required: true })}
                    placeholder="Enter Mobile Number"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* E-mail Address */}
                <div className="mb-2">
                  <label
                    htmlFor="mobile"
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
                    htmlFor="nid"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    NID / Birth Certificate Number{" "}
                    <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="nid"
                    {...register("nid", { required: true })}
                    placeholder="Enter NID / Birth Certificate Number"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/*  Department / Team */}
                <div className="mb-2">
                  <label
                    htmlFor="department"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Department / Team <span className="text-red-600">*</span>
                  </label>

                  <select
                    {...register("department", {
                      required: "department is required",
                    })}
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  >
                    <option value="">Select Department / Team</option>
                    <option value="male">A</option>
                    <option value="female">B</option>
                    <option value="other">C</option>
                  </select>
                </div>

                {/*  Designation / Role */}
                <div className="mb-2">
                  <label
                    htmlFor="designation"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Designation / Role <span className="text-red-600">*</span>
                  </label>

                  <select
                    {...register("designation", {
                      required: "designation is required",
                    })}
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  >
                    <option value="">Select Designation / Role</option>
                    <option value="male">A</option>
                    <option value="female">B</option>
                    <option value="other">C</option>
                  </select>
                </div>

                {/* parmanent address */}
                <div className="mb-2">
                  <label
                    htmlFor="parmanent"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Permanent Address <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="parmanent"
                    {...register("parmanent", { required: true })}
                    placeholder="Enter Permanent Address"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* present address */}
                <div className="mb-2">
                  <label
                    htmlFor="present"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Present Address <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    id="present"
                    {...register("present", { required: true })}
                    placeholder="Enter Present Address"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/*  Date of joining */}
                <div className="mb-2">
                  <label
                    htmlFor="joinDate"
                    className="block text-base font-medium text-left text-gray-50 mb-2"
                  >
                    Joining Date <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="date"
                    id="joinDate"
                    {...register("joinDate", { required: true })}
                    placeholder="Enter Joining Date"
                    className="mt-1 bg-[#8995A3] placeholder-white block w-full px-4 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                </div>

                {/* Bio */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="bio"
                    className="block text-sm text-left font-medium text-white"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows="3"
                    {...register("bio", { required: true })}
                    placeholder="Enter Bio"
                    className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <div className="flex items-center mx-auto col-span-2 gap-3">
                  <input type="checkbox" name="" id="" className="" />
                  <span>Send Welcome Email (Checkbox)</span>
                </div>
              </div>

              <div className=" w-full lg:w-4/12">
                {/* photo upload */}
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
                      className=" cursor-pointer bg-gray-50 hover:bg-gray-100 text-black font-medium py-2 px-3 rounded-lg shadow transition duration-200 flex items-center gap-2"
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
                  <span className="mt-2 text-xs px-2">
                    Please upload a recent passport size photo (300x300 pixels,
                    max 200 KB, JPEG/PNG).
                  </span>

                  <input type="hidden" name="image" value={uploadedImageUrl} />
                </div>

                {/* Signature */}
                <div className="flex-shrink-0 flex flex-col items-center mt-6">
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
                      className="w-44 h-20  object-cover border-4 border-blue-500 shadow"
                    />
                  )}

                  <div className="mt-4">
                    <label
                      htmlFor="imageUpload"
                      className=" cursor-pointer bg-gray-50 hover:bg-gray-100 text-black font-medium py-2 px-3 rounded-lg shadow transition duration-200 flex items-center gap-2"
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
                  <span className="mt-2 text-xs px-4">
                    Please upload your signature (300x100 pixels, max 100 KB,
                    PNG preferred).
                  </span>

                  <input type="hidden" name="image" value={uploadedImageUrl} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddMember;
