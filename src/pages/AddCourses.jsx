// testing

import axios from "axios";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddCourses = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      instructors: [{ name: "", about: "", image: "", sign: "" }],
      links: [
        {
          fb: [{ title: "", link: "" }],
          zoom: [{ title: "", link: "" }],
        },
      ],
      modules: [
        {
          title: "",
          description: "",
          videoLink: "",
          resources: [{ title: "", link: "" }],
        },
      ],
      type: "offline",
    },
  });

  const {
    fields: instructorFields,
    append: appendInstructor,
    remove: removeInstructor,
  } = useFieldArray({ control, name: "instructors" });

  const {
    fields: fbFields,
    append: appendFb,
    remove: removeFb,
  } = useFieldArray({
    control,
    name: "links[0].fb",
  });

  const {
    fields: zoomFields,
    append: appendZoom,
    remove: removeZoom,
  } = useFieldArray({
    control,
    name: "links[0].zoom",
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({ control, name: "modules" });

  //   const onError = (errors) => {
  //   const firstErrorField = Object.keys(errors)[0];
  //   const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
  //   if (errorElement) {
  //     errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  //     errorElement.focus();
  //   }
  // };

  const onError = (errors) => {
    const firstErrorField = Object.keys(errors)[0];
    Object.keys(errors).forEach((field) => {
      const el = document.querySelector(`[name="${field}"]`);
      if (el) {
        // Problem: you used classList.remove with a single string containing commas
        // It should be separate class names, no commas
        el.classList.remove("focus:ring-blue-500", "border-gray-300");
        el.classList.add("focus:border-red-500");
      }
    });
    const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      errorElement.focus();
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/courses/add`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Course added successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        reset();
        navigate("/courses");
      });
  };

  return (
    <div>
      <h1 className="text-center text-xl font-fold text-blue-800 font-bold">
        Fill Up the form with Course Information
      </h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            Please fill out all required fields.
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-10">
          <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
            Basic Course Information
          </h1>
          <div></div>

          {/* Course Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              placeholder="Enter course title"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              {...register("subtitle", { required: true })}
              placeholder="Enter course subtitle"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm text-left font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              {...register("description", { required: true })}
              placeholder="Enter course description"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          {/* Course Route */}
          <div className="mb-4">
            <label
              htmlFor="route"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Course Route
            </label>
            <input
              type="text"
              id="route"
              {...register("route", { required: true })}
              placeholder="Enter course route"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Course Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Course Category
            </label>
            <input
              type="text"
              id="category"
              {...register("category", { required: true })}
              placeholder="Enter course category"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Course Type */}
          <div className="mb-4">
            <label className="block text-sm text-left font-medium text-gray-700 mb-2">
              Course Type
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="online"
                  {...register("type", { required: true })}
                  className="form-radio text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Online</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="offline"
                  {...register("type")}
                  className="form-radio text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Offline</span>
              </label>
            </div>
          </div>

          {/* Intro Video */}
          <div className="mb-4">
            <label
              htmlFor="introVideo"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Intro Video
            </label>
            <input
              type="text"
              id="introVideo"
              {...register("introVideo", { required: true })}
              placeholder="Enter intro video link"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", { required: true })}
              placeholder="Enter price"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label
              htmlFor="startdate"
              className="block text-sm text-left font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startdate"
              {...register("startDate", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Total Class */}
          <div className="mb-4">
            <label
              htmlFor="totalClasses"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Total Class
            </label>
            <input
              type="text"
              id="totalClasses"
              {...register("totalClasses", { required: true })}
              placeholder="Enter total classes"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              {...register("duration", { required: true })}
              placeholder="Enter duration"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Thumbnail */}
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Thumbnail
            </label>
            <input
              type="text"
              id="thumbnail"
              {...register("thumbnail", { required: true })}
              placeholder="Enter thumbnail URL"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Course Instructor */}
          <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
            Course Instructor
          </h1>
          <div></div>

          {instructorFields.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  Name
                </label>
                <input
                  {...register(`instructors.${index}.name`, { required: true })}
                  placeholder="Enter instructor name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  About
                </label>
                <input
                  {...register(`instructors.${index}.about`, {
                    required: true,
                  })}
                  placeholder="Enter instructor about info"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  Image
                </label>
                <input
                  {...register(`instructors.${index}.image`, {
                    required: true,
                  })}
                  placeholder="Enter instructor image URL"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  Signature
                </label>
                <input
                  {...register(`instructors.${index}.sign`, { required: true })}
                  placeholder="Enter instructor signature"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {/* Show Remove button only if index > 0 */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeInstructor(index)}
                  className="text-red-600"
                >
                  Remove
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  appendInstructor({ name: "", about: "", image: "", sign: "" })
                }
                className="text-blue-600"
              >
                + Add Instructor
              </button>
              <div></div>
            </React.Fragment>
          ))}

          <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
            Course Resourses
          </h1>
          <div></div>
          {/* 🔗 FB & Zoom Links Section */}
          <div className="mb-4">
            <label className="block text-sm text-left font-medium text-gray-700 mb-2">
              Facebook Links
            </label>
            {fbFields.map((item, index) => (
              <div key={item.id} className="mb-2">
                <input
                  {...register(`links[0].fb.${index}.title`, {
                    required: true,
                  })}
                  type="text"
                  placeholder="FB Link Title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                />
                <input
                  {...register(`links[0].fb.${index}.link`, { required: true })}
                  type="url"
                  placeholder="FB Link URL"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeFb(index)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => appendFb({ title: "", link: "" })}
                  className="text-blue-600 text-sm hover:underline mt-1 ml-2"
                >
                  + Add Facebook Link
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-left font-medium text-gray-700 mb-2">
              Zoom Links
            </label>
            {zoomFields.map((item, index) => (
              <div key={item.id} className="mb-2">
                <input
                  {...register(`links[0].zoom.${index}.title`, {
                    required: true,
                  })}
                  type="text"
                  placeholder="Zoom Link Title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                />
                <input
                  {...register(`links[0].zoom.${index}.link`, {
                    required: true,
                  })}
                  type="url"
                  placeholder="Zoom Link URL"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeZoom(index)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => appendZoom({ title: "", link: "" })}
                  className="text-blue-600 text-sm hover:underline mt-1 ml-2"
                >
                  + Add Zoom Link
                </button>
              </div>
            ))}
          </div>

          <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
            Course Modules
          </h1>
          <div></div>

          {moduleFields.map((mod, index) => (
            <React.Fragment key={mod.id}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  Module Title
                </label>
                <input
                  {...register(`modules.${index}.title`, { required: true })}
                  placeholder="Enter module title"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  Video Link
                </label>
                <input
                  {...register(`modules.${index}.videoLink`, {
                    required: true,
                  })}
                  placeholder="Enter module video link"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  Description
                </label>
                <textarea
                  {...register(`modules.${index}.description`, {
                    required: true,
                  })}
                  placeholder="Enter module description"
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
              

              {/* Resources inside Module */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-gray-700">
                  Resource Title
                </label>
                <input
                  {...register(`modules.${index}.resources.0.title`, {
                    required: true,
                  })}
                  placeholder="Enter resource title"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <label className="block text-sm font-medium text-left text-gray-700 mt-2">
                  Resource Link
                </label>
                <input
                  {...register(`modules.${index}.resources.0.link`, {
                    required: true,
                  })}
                  placeholder="Enter resource link"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeModule(index)}
                  className="text-red-600"
                >
                  Remove Module
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  appendModule({
                    title: "",
                    description: "",
                    videoLink: "",
                    resources: [{ title: "", link: "" }],
                  })
                }
                className="text-blue-600"
              >
                + Add Module
              </button>
            </React.Fragment>
          ))}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#0b2a53] hover:bg-[#21579e] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 my-3 w-full"
        >
          Add Course
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddCourses;

// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";

// const AddCourses = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);

//     const instructorData = {
//       name: data.instructorName,
//       about: data.instructorAbout,
//       image: data.instructorImage,
//       sign: data.instructorSignature,
//     };

//     const fb = {
//       fbtitle: data.fbTitle,
//       fblink: data.fbLink,
//     };

//     const zoom = {
//       zoomtitle: data.zoomTitle,
//       zoomlink: data.zoomLink,
//     };

//     const moduleData = {
//       moduleTitle: data.moduleTitle,
//       moduleDescription: data.moduleDescription,
//       moduleVideo: data.moduleVideo,
//       resourceTitle: data.resourceTitle,
//       resourceLink: data.resourceLink,
//     };

//     data.instructors = [instructorData];

//     axios
//       .post(`${import.meta.env.VITE_API_URL}/api/courses/add`, data)
//       .then((res) => console.log(res.data));
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-10">
//           <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
//             Basic Course Information
//           </h1>
//           <div></div>

//           {/* Course Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Course Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               {...register("title", { required: true })}
//               placeholder="Enter course title"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Subtitle */}
//           <div className="mb-4">
//             <label
//               htmlFor="subtitle"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Subtitle
//             </label>
//             <input
//               type="text"
//               id="subtitle"
//               {...register("subtitle", { required: true })}
//               placeholder="Enter course subtitle"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-sm text-left font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               rows="4"
//               {...register("description", { required: true })}
//               placeholder="Enter course description"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//             ></textarea>
//           </div>

//           {/* Course Route */}
//           <div className="mb-4">
//             <label
//               htmlFor="route"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Course Route
//             </label>
//             <input
//               type="text"
//               id="route"
//               {...register("route", { required: true })}
//               placeholder="Enter course route"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Category */}
//           <div className="mb-4">
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Course Category
//             </label>
//             <input
//               type="text"
//               id="category"
//               {...register("category", { required: true })}
//               placeholder="Enter course category"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Type */}
//           <div className="mb-4">
//             <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//               Course Type
//             </label>
//             <div className="flex items-center gap-6">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   value="online"
//                   {...register("type", { required: true })}
//                   className="form-radio text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-gray-700">Online</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   value="offline"
//                   {...register("type")}
//                   className="form-radio text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-gray-700">Offline</span>
//               </label>
//             </div>
//           </div>

//           {/* Intro Video */}
//           <div className="mb-4">
//             <label
//               htmlFor="introVideo"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Intro Video
//             </label>
//             <input
//               type="text"
//               id="introVideo"
//               {...register("introVideo", { required: true })}
//               placeholder="Enter intro video link"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Price */}
//           <div className="mb-4">
//             <label
//               htmlFor="price"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Price
//             </label>
//             <input
//               type="number"
//               id="price"
//               {...register("price", { required: true })}
//               placeholder="Enter price"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Start Date */}
//           <div className="mb-4">
//             <label
//               htmlFor="startdate"
//               className="block text-sm text-left font-medium text-gray-700"
//             >
//               Start Date
//             </label>
//             <input
//               type="date"
//               id="startdate"
//               {...register("startdate", { required: true })}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Total Class */}
//           <div className="mb-4">
//             <label
//               htmlFor="totalClasses"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Total Class
//             </label>
//             <input
//               type="text"
//               id="totalClasses"
//               {...register("totalClasses", { required: true })}
//               placeholder="Enter total classes"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Duration */}
//           <div className="mb-4">
//             <label
//               htmlFor="duration"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Duration
//             </label>
//             <input
//               type="text"
//               id="duration"
//               {...register("duration", { required: true })}
//               placeholder="Enter duration"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Thumbnail */}
//           <div className="mb-4">
//             <label
//               htmlFor="thumbnail"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Thumbnail
//             </label>
//             <input
//               type="text"
//               id="thumbnail"
//               {...register("thumbnail", { required: true })}
//               placeholder="Enter thumbnail URL"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Instructor */}
//           <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
//             Course Instructor
//           </h1>
//           <div></div>

//           {/* Instructor Name */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorName"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="instructorName"
//               {...register("instructorName", { required: true })}
//               placeholder="Enter instructor name"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Instructor About */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorAbout"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               About
//             </label>
//             <input
//               type="text"
//               id="instructorAbout"
//               {...register("instructorAbout", { required: true })}
//               placeholder="Enter instructor about info"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Instructor Image */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorImage"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Image
//             </label>
//             <input
//               type="text"
//               id="instructorImage"
//               {...register("instructorImage", { required: true })}
//               placeholder="Enter instructor image URL"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Instructor Signature */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorSignature"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Signature
//             </label>
//             <input
//               type="text"
//               id="instructorSignature"
//               {...register("instructorSignature", { required: true })}
//               placeholder="Enter instructor signature"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Resources */}
//           <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
//             Course Resources
//           </h1>
//           <div></div>

//           {/* Facebook Group Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="fbTitle"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Facebook Group Title
//             </label>
//             <input
//               type="text"
//               id="fbTitle"
//               {...register("fbTitle", { required: true })}
//               placeholder="Enter Facebook group title"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Facebook Group Link */}
//           <div className="mb-4">
//             <label
//               htmlFor="fbLink"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Facebook Group Link
//             </label>
//             <input
//               type="text"
//               id="fbLink"
//               {...register("fbLink", { required: true })}
//               placeholder="Enter Facebook group link"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Zoom Class Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="zoomTitle"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Zoom Class Title
//             </label>
//             <input
//               type="text"
//               id="zoomTitle"
//               {...register("zoomTitle", { required: true })}
//               placeholder="Enter Zoom class title"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Zoom Class Link */}
//           <div className="mb-4">
//             <label
//               htmlFor="zoomLink"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Zoom Class Link
//             </label>
//             <input
//               type="text"
//               id="zoomLink"
//               {...register("zoomLink", { required: true })}
//               placeholder="Enter Zoom class link"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Modules */}
//           <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
//             Course Modules
//           </h1>
//           <div></div>

//           {/* Module Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="moduleTitle"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Title
//             </label>
//             <input
//               type="text"
//               id="moduleTitle"
//               {...register("moduleTitle", { required: true })}
//               placeholder="Enter module title"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Module Description */}
//           <div className="mb-4">
//             <label
//               htmlFor="moduleDescription"
//               className="block text-sm text-left font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="moduleDescription"
//               rows="4"
//               {...register("moduleDescription", { required: true })}
//               placeholder="Enter module description"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//             ></textarea>
//           </div>

//           {/* Module Video */}
//           <div className="mb-4">
//             <label
//               htmlFor="moduleVideo"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Video Link
//             </label>
//             <input
//               type="text"
//               id="moduleVideo"
//               {...register("moduleVideo", { required: true })}
//               placeholder="Enter module video link"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Resource Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="resourceTitle"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Resource Title
//             </label>
//             <input
//               type="text"
//               id="resourceTitle"
//               {...register("resourceTitle", { required: true })}
//               placeholder="Enter resource title"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Resource Link */}
//           <div className="mb-4">
//             <label
//               htmlFor="resourceLink"
//               className="block text-sm font-medium text-left text-gray-700"
//             >
//               Resource Link
//             </label>
//             <input
//               type="text"
//               id="resourceLink"
//               {...register("resourceLink", { required: true })}
//               placeholder="Enter resource link"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//         </div>
//          {/* Submit Button */}
//           <button
//             type="submit"

//             className="bg-[#0b2a53] hover:bg-[#21579e] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 my-3 w-full"
//           >
//             Add Course
//           </button>
//       </form>
//     </div>
//   );
// };

// export default AddCourses;
