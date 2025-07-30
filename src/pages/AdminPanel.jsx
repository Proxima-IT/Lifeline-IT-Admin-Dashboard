import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const AdminPanel = () => {
  const [banner, setBanner] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

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
    data.bannerImage = banner;
    console.log(data);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/general`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Data added successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        reset();
      });
  };
  return (
    <div>
      <h1>Add Content from Admin</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center  md:flex-row gap-10 mt-3"
      >
        {/* Info Section */}
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
          {/* total */}

            <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Total Student
            </label>
            <input
              type="text"
              {...register("totalStudents", { required: true })}
              // value={data.email}
              placeholder="Enter your website's total student"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
            />
          </div>
          {/* Thumbnail */}
          <div className="mb-4">
            <label
              htmlFor="banner"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Banner
            </label>

            <input
              id="banner"
              type="file"
              accept="image/*"
              {...register("bannerImage", { required: true })}
              placeholder="Enter Banner URL"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  uploadImage(file, "banner");
                }
              }}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div></div>
          <img
            src={
              banner ||
              "https://bestmedia.lk/wp-content/uploads/2024/09/Large-Format-Flex-Banner-Print.jpg"
            }
            alt="banner"
            className="w-36 h-20 object-cover border border-black shadow"
          />

        

          <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact Number 1
            </label>
            <input
              type="text"
              {...register("contact1", { required: true })}
              // value={data.email}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Available Time
            </label>
            <input
              type="text"
              {...register("available1", { required: true })}
              // value={data.email}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact Number 2
            </label>
            <input
              type="text"
              {...register("contact2", { required: true })}
              // value={data.email}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Available Time
            </label>
            <input
              type="text"
              {...register("available2", { required: true })}
              // value={data.email}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact Number 3
            </label>
            <input
              type="text"
              {...register("contact3", { required: true })}
              // value={data.email}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Available Time
            </label>
            <input
              type="text"
              {...register("available3", { required: true })}
              // value={data.email}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
            />
          </div>

        

          <input
            type="submit"
            value="Add"
            className="w-full col-span-2 bg-[#285599] border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer"
          />
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AdminPanel;
