import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AdminPanel = () => {
  const [banner, setBanner] = useState("");
  const [panelData, setpanelData] = useState({});
const location = useLocation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/general`).then((res) => {
      console.log("heelo");
      setpanelData(res.data);
    });
  }, []);

  console.log(panelData);

  async function uploadImage(file, type) {
    // setLoading(true); // start loading spinner

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1, // Compress to 1MB or less
        maxWidthOrHeight: 1024, // Resize if too large
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("image", compressedFile);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data?.data?.url) {
        if (type === "banner") {
          setBanner(data.data.url); // ✅ Only update thumbnail
        }

        console.log("Image URL:", data.data.url);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      //   setLoading(false); // stop loading spinner regardless of success/failure
    }
  }

  const onSubmit = (data) => {
    const formattedData = {
      bannerImage: banner,
      studentInfo: {
        totalStudents: data.totalStudents,
        successCount: data.successCount, // or set it from an input
        courseCompletors: data.courseCompletors, // or set it from an input
      },
      contactInfo: [
        {
          number: data.contact1,
          time: data.available1,
        },
        {
          number: data.contact2,
          time: data.available2,
        },
        {
          number: data.contact3,
          time: data.available3,
        },
      ],
    };

    console.log(formattedData); // Confirm the structure

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/general`, formattedData)
      .then((res) => {
        console.log(res.data);
        toast.success("Data added successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to send data", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      });
  };
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
    <main className="flex-1  overflow-y-auto w-full">
      {location.pathname === "/admin" && (
        <div className="lg:w-[45%] w-[85%] mx-auto rounded-lg  text-[20px] lg:text-[32px] font-bold bg-[#0052CC] text-white my-[15px] p-3">
          {greeting}, <strong> Admin 👋</strong>
        </div>
      )}

      <div className="bg-[#132949] border border-[#00B5FF] rounded-lg p-6 my-3 mx-5 lg:mx-10">
        {/* // main dynamic content goes here */}
        <div className="p-2 lg:p-6">
          <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-full lg:w-1/4 px-3 py-1 mx-auto rounded-md">
            Home Page
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center  md:flex-row gap-10 mt-3 w-full "
          >
            {/* Info Section */}
            <div className="flex-1 w-full flex flex-col lg:grid lg:grid-cols-2 gap-5 text-left">
              {/* total */}

              <div className="">
                <label className=" text-sm font-medium text-white ">
                  Marks Student
                </label>
                <input
                  type="text"
                  {...register("totalStudents")}
                  // value={data.email}
                  defaultValue={panelData?.studentInfo?.totalStudents || ""}
                  placeholder="Enter your website's total student"
                  className="w-full bg-[#8995A3] placeholder-white  rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-white ">
                  Success Count
                </label>
                <input
                  type="text"
                  {...register("successCount")}
                  defaultValue={panelData?.studentInfo?.successCount}
                  placeholder="Enter your website's total success count"
                  className="w-full bg-[#8995A3] placeholder-white rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-white ">
                  Course Completors
                </label>
                <input
                  type="text"
                  {...register("courseCompletors")}
                  defaultValue={panelData?.studentInfo?.courseCompletors}
                  placeholder="Enter your website's total course completors"
                  className="w-full bg-[#8995A3] placeholder-white rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-white ">
                  Intro Video Link
                </label>
                <input
                  type="text"
                  {...register("courseCompletors")}
                  defaultValue={panelData?.studentInfo?.courseCompletors}
                  // placeholder="Enter your website's total course completors"
                  className="w-full bg-[#8995A3]  placeholder-white rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                />
              </div>

              {/* Thumbnail */}
              <div className=" relative">
                <label
                  htmlFor="banner"
                  className=" text-sm font-medium text-left text-white"
                >
                  Ads Banner Design
                </label>

                <input
                  id="banner"
                  type="file"
                  accept="image/*"
                  {...register("bannerImage")}
                  placeholder="Enter Banner URL"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      uploadImage(file, "banner");
                    }
                  }}
                  className="mt-1 block w-full px-4 py-2 bg-[#C72E67] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                <img
                  src={
                    panelData?.bannerImage ||
                    "https://bestmedia.lk/wp-content/uploads/2024/09/Large-Format-Flex-Banner-Print.jpg"
                  }
                  alt="banner"
                  className="absolute right-2 top-8 w-20 h-10 object-cover border border-black shadow"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-white ">
                  Join as a Mentor (Google Form Link)
                </label>
                <input
                  type="text"
                  {...register("courseCompletors")}
                  defaultValue={panelData?.studentInfo?.courseCompletors}
                  // placeholder="Enter your website's total course completors"
                  className="w-full bg-[#A484FF] placeholder-white rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-white ">
                  Banner Link ( If a link needs to be added in the banner)
                </label>
                <input
                  type="text"
                  {...register("courseCompletors")}
                  defaultValue={panelData?.studentInfo?.courseCompletors}
                  // placeholder="Enter your website's total course completors"
                  className="w-full bg-[#8995A3] placeholder-white  rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                />
              </div>
              <div></div>

              <div className="text-2xl font-bold text-white text-center mb-4 bg-[#1398DB] w-full lg:w-1/4 px-3 py-1 mx-auto rounded-md col-span-2">
                Contact
              </div>

              {panelData?.contactInfo?.map((contactInfo, index) => (
                <>
                  <div className="">
                    <label className="block text-sm font-medium text-white ">
                      Contact-{index + 1}
                    </label>
                    <input
                      type="text"
                      {...register(`contact${index + 1}`)}
                      placeholder={`Enter contact number ${index + 1}`}
                      defaultValue={contactInfo.number}
                      className="w-full bg-[#8995A3]  rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                    />
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-white ">
                      Available Time
                    </label>
                    <input
                      type="text"
                      {...register(`available${index + 1}`)}
                      defaultValue={contactInfo.time}
                      placeholder="Availability for this contact"
                      className="w-full bg-[#8995A3]  rounded-md px-4 py-2 shadow-sm text-white font-medium mt-2  focus:outline-none"
                    />
                  </div>
                </>
              ))}
              <input
                type="submit"
                value="Change & Update"
                className="lg:w-1/2 w-full mx-auto lg:col-span-2 bg-[#0052CC] mt-3 rounded-md px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer"
              />
            </div>
          </form>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
