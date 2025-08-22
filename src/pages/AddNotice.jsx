import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddNotice = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/dashboard/notices`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Notice added successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        reset();
        setTimeout(() => {
          navigate("/notice");
        }, 3000);
      });
  };

  return (
    <div>
      <main className="flex-1  overflow-y-auto w-full">
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-[80%] lg:w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          Add New Notice
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-6 my-3 mx-4 lg:mx-10">
          <h1 className="text-center text-xl font-fold text-[#00FFFF] font-bold">
            Fill Up the form with Notice Information
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto mt-5"
          >
            {/* notice Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-left text-white"
              >
                Notice Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                placeholder="Enter notice title"
                className="mt-1 block w-full px-4 py-2 border bg-[#8995A3] text-white placeholder-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* description  */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm text-left font-medium text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                {...register("description", { required: true })}
                placeholder="Enter notice description"
                className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            {/* image */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-left text-white"
              >
                Image
              </label>
              <input
                type="text"
                id="image"
                {...register("image", { required: true })}
                placeholder="Enter image URL"
                className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0052CC] hover:bg-[#0052CC] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 my-3 w-full "
            >
              Add Notice
            </button>
          </form>
        </div>
      </main>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddNotice;
