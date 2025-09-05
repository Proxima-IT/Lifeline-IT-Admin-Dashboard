// testing

import axios from "axios";
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import imageCompression from "browser-image-compression";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

const AddCourses = () => {
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState("");
  const [instructorImage, setInstructorImage] = useState("");
  const [status, setStatus] = useState("Published");

  const options = ["Draft", "Published", "Archived"];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
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
    fields: zoomFields2,
    append: appendZoom2,
    remove: removeZoom2,
  } = useFieldArray({
    control,
    name: "links[0].zoom",
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({ control, name: "modules" });

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
        if (type === "thumbnail") {
          setThumbnail(data.data.url); // ✅ Only update thumbnail
        } else if (type === "instructor") {
          setInstructorImage(data.data.url); // ✅ Only update instructor image
        }

        console.log("Image URL:", data.data.url);
        return data.data.url;
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      // setLoading(false); // stop loading spinner regardless of success/failure
    }
  }

  const onSubmit = (data) => {
    data.thumbnail = thumbnail;
    // data.instructor = instructor;
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
        setTimeout(() => {
          navigate("/courses");
        }, 3000);
      });
  };

  return (
    <div className="my-5">
      <main className="flex-1  overflow-y-auto w-full">
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-[80%] lg:w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          Add Courses
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-6 my-3 mx-4 lg:mx-10">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                Please fill out all required fields.
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:p-10 p-4">
              <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
                Basic Course Information
              </h1>
              <div></div>

              {/* Course Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-left text-white"
                >
                  Course Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="Enter course title"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Subtitle */}
              <div className="mb-4">
                <label
                  htmlFor="subtitle"
                  className="block text-sm font-medium text-left text-white"
                >
                  Subtitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  {...register("subtitle")}
                  placeholder="Enter course subtitle"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Thumbnail */}
              <div className="mb-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-left text-white"
                >
                  Thumbnail <span className="text-red-600">*</span>
                </label>

                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  {...register("thumbnail", { required: true })}
                  placeholder="Enter thumbnail URL"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      uploadImage(file, "thumbnail");
                    }
                  }}
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <img
                src={thumbnail}
                alt="thumbnail"
                className="w-36 h-20 object-cover border border-[#00FFFF] shadow"
              />

              {/* Details */}
              <div className="mb-4">
                <label
                  htmlFor="details"
                  className="block text-sm text-left font-medium text-white"
                >
                  Course Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="details"
                  rows="4"
                  {...register("details", { required: true })}
                  placeholder="Enter course details"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                ></textarea>
              </div>

              {/* Course content */}
              <div className="mb-4">
                <label
                  htmlFor="route"
                  className="block text-sm font-medium text-left text-white"
                >
                  Content <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="route"
                  {...register("contentTitle", { required: true })}
                  placeholder="Content title here"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {/* Details Content */}
                <textarea
                  id="description"
                  rows="4"
                  {...register("detailsContent")}
                  placeholder="Details content..."
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                ></textarea>
              </div>

              {/* Course Route */}
              <div className="mb-4">
                <label
                  htmlFor="route"
                  className="block text-sm font-medium text-left text-white"
                >
                  Course Route
                </label>
                <input
                  type="text"
                  id="route"
                  {...register("route", { required: true })}
                  placeholder="Enter course route"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Course Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-left text-white"
                >
                  Course Category
                </label>
                <input
                  type="text"
                  id="category"
                  {...register("category", { required: true })}
                  placeholder="Enter course category"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Course Type */}
              <div className="mb-4">
                <label className="block text-sm text-left font-medium text-white mb-2">
                  Course Type
                </label>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="online"
                      {...register("type", { required: true })}
                      className="form-radio text-[#00FFFF] focus:ring-blue-500"
                    />
                    <span className="ml-2 text-white">Online</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="offline"
                      {...register("type")}
                      className="form-radio text-[#00FFFF] focus:ring-blue-500"
                    />
                    <span className="ml-2 text-white">Offline</span>
                  </label>
                </div>
              </div>

              {/* cut Price */}
              <div className="mb-4">
                <label
                  htmlFor="cutPrice"
                  className="block text-sm font-medium text-left text-white"
                >
                  Cutoff Price
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("cutPrice", { required: true })}
                  placeholder="Enter cut price"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-left text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("price", { required: true })}
                  placeholder="Enter price"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* star count */}
              <div className="mb-4">
                <label
                  htmlFor="starCount"
                  className="block text-sm font-medium text-left text-white"
                >
                  Star Count
                </label>
                <input
                  type="text"
                  id="price"
                  {...register("starCount", { required: true })}
                  placeholder="Enter star count"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* review count */}
              <div className="mb-4">
                <label
                  htmlFor="reviewCount"
                  className="block text-sm font-medium text-left text-white"
                >
                  Review Count
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("reviewCount", { required: true })}
                  placeholder="Enter review count"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Intro Video */}
              <div className="mb-4">
                <label
                  htmlFor="introVideo"
                  className="block text-sm font-medium text-left text-white"
                >
                  Intro Video
                </label>
                <input
                  type="text"
                  id="introVideo"
                  {...register("introVideo", { required: true })}
                  placeholder="Enter intro video link"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Start Date */}
              <div className="mb-4">
                <label
                  htmlFor="startdate"
                  className="block text-sm text-left font-medium text-white"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startdate"
                  {...register("startDate", { required: true })}
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Total Class */}
              <div className="mb-4">
                <label
                  htmlFor="totalClasses"
                  className="block text-sm font-medium text-left text-white"
                >
                  Total Class
                </label>
                <input
                  type="text"
                  id="totalClasses"
                  {...register("totalClasses", { required: true })}
                  placeholder="Enter total classes"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Duration */}
              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-left text-white"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  {...register("duration", { required: true })}
                  placeholder="Enter duration"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div></div>
              {/* Course Instructor */}
              <h1 className="text-left text-lg font-fold text-[#2AAAE2] font-bold ">
                Select Course Instructor
              </h1>
              <div></div>

              {instructorFields.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-left text-white">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register(`instructors.${index}.name`, {
                        required: true,
                      })}
                      placeholder=""
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-left text-white">
                      Instructor Role <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register(`instructors.${index}.about`, {
                        required: true,
                      })}
                      placeholder=""
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-left text-white">
                      About Instructor <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register(`instructors.${index}.about`, {
                        required: true,
                      })}
                      placeholder=""
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div></div>

                  {/* signature upload  */}
                  <div className="mb-4">
                    <label
                      htmlFor="instructorImage"
                      className="block text-sm font-medium text-left text-white"
                    >
                      Signature (300x80 - PNG Transparent, max 500KB)
                    </label>

                    <input
                      id="instructorImage"
                      type="file"
                      accept="image/png"
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // **Size check: 500KB max**
                          const maxSize = 500 * 1024; // 500 KB
                          if (file.size > maxSize) {
                            alert(
                              "File size exceeds 500KB. Please choose a smaller file."
                            );
                            e.target.value = null; // reset input
                            return;
                          }

                          // **Optional: check dimensions (300x80)**
                          const img = new Image();
                          img.src = URL.createObjectURL(file);
                          img.onload = async () => {
                            if (img.width !== 300 || img.height !== 80) {
                              alert("Image must be exactly 300x80 px.");
                              e.target.value = null;
                              return;
                            }

                            // Upload if all checks pass
                            const imageUrl = await uploadImage(
                              file,
                              "instructor"
                            );
                            setValue(`instructors.${index}.image`, imageUrl, {
                              shouldValidate: true,
                            });
                          };
                        }
                      }}
                    />
                  </div>

                  {/* signature preview  */}
                  <img
                    src={watch(`instructors.${index}.image`)} // watch the current field
                    alt="signature"
                    className="w-36 h-20 object-cover border border-[#00FFFF] shadow"
                  />

                  {/* photo upload  */}

                  <div className="mb-4">
                    <label
                      htmlFor={`instructorImage-${index}`}
                      className="block text-sm font-medium text-left text-white"
                    >
                      Photo (300x300) <span className="text-red-600">*</span>
                    </label>

                    <input
                      id={`instructorImage-${index}`}
                      type="file"
                      accept="image/png, image/jpeg"
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      {...register(`instructors.${index}.image`, {
                        required: "Image is required",
                      })}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        // **Size check: 500KB max**
                        const maxSize = 500 * 1024;
                        if (file.size > maxSize) {
                          alert(
                            "File size exceeds 500KB. Please choose a smaller file."
                          );
                          e.target.value = null;
                          setValue(`instructors.${index}.image`, null);
                          return;
                        }

                        // **Dimension check: 300x300**
                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        img.onload = async () => {
                          if (img.width !== 300 || img.height !== 300) {
                            alert("Image must be exactly 300x300 px.");
                            e.target.value = null;
                            setValue(`instructors.${index}.image`, null);
                            return;
                          }

                          // Upload if all checks pass
                          const imageUrl = await uploadImage(
                            file,
                            "instructor"
                          );
                          setValue(`instructors.${index}.image`, imageUrl, {
                            shouldValidate: true,
                          });
                        };
                      }}
                    />
                    {errors?.instructors?.[index]?.image && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.instructors[index].image.message}
                      </p>
                    )}
                  </div>

                  {/* photo preview  */}
                  <img
                    src={watch(`instructors.${index}.image`)} // watch the current field
                    alt="photo"
                    className="w-36 h-20 object-cover border border-[#00FFFF] shadow"
                  />

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
                      appendInstructor({
                        name: "",
                        about: "",
                        image: "",
                        sign: "",
                      })
                    }
                    className="text-[#F79421] text-left"
                  >
                    + Add Instructor
                  </button>
                  <div></div>
                </React.Fragment>
              ))}

              <h1 className="text-left text-lg font-fold text-[#2AAAE2] font-bold">
                Course Essential Links
              </h1>
              <div></div>

              {/* 🔗 FB & Zoom Links Section */}
              <div className="mb-4">
                <label className="block text-sm text-left font-medium text-white mb-2">
                  All Secret Group Links <span className="text-red-600">*</span>
                </label>
                {fbFields.map((item, index) => (
                  <div key={item.id} className="mb-2">
                    <input
                      {...register(`links[0].fb.${index}.title`, {
                        required: true,
                      })}
                      type="text"
                      placeholder="FB Link Title"
                      className="w-full px-4 py-2 border rounded-md bg-[#8995A3] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                    />
                    <input
                      {...register(`links[0].fb.${index}.link`, {
                        required: true,
                      })}
                      type="url"
                      placeholder="FB Link URL"
                      className="w-full px-4 py-2 border rounded-md bg-[#8995A3] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="text-[#F79421] text-left text-sm hover:underline mt-1 ml-2"
                    >
                      + Add Facebook Link
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-left font-medium text-white mb-2">
                  Zoom Support Links <span className="text-red-600">*</span>
                </label>
                {zoomFields.map((item, index) => (
                  <div key={item.id} className="mb-2">
                    <input
                      {...register(`links[0].zoom.${index}.title`, {
                        required: true,
                      })}
                      type="text"
                      placeholder="Zoom Link Title"
                      className="w-full px-4 py-2 border rounded-md bg-[#8995A3] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                    />
                    <input
                      {...register(`links[0].zoom.${index}.link`, {
                        required: true,
                      })}
                      type="url"
                      placeholder="Zoom Link URL"
                      className="w-full px-4 py-2 border rounded-md bg-[#8995A3] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="text-[#F79421] text-left text-sm hover:underline mt-1 ml-2"
                    >
                      + Add Zoom Link
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-left font-medium text-white mb-2">
                  Zoom Live Class Links <span className="text-red-600">*</span>
                </label>
                {zoomFields2.map((item, index) => (
                  <div key={item.id} className="mb-2">
                    <input
                      {...register(`links[0].zoom.${index}.title`, {
                        required: true,
                      })}
                      type="text"
                      placeholder="Zoom Link Title"
                      className="w-full px-4 py-2 border rounded-md bg-[#8995A3] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                    />
                    <input
                      {...register(`links[0].zoom.${index}.link`, {
                        required: true,
                      })}
                      type="url"
                      placeholder="Zoom Link URL"
                      className="w-full px-4 py-2 border rounded-md bg-[#8995A3] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeZoom2(index)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => appendZoom2({ title: "", link: "" })}
                      className="text-[#F79421] text-left text-sm hover:underline mt-1 ml-2"
                    >
                      + Add Zoom Link
                    </button>
                  </div>
                ))}
              </div>
              <div></div>

              <h1 className="text-left text-lg font-fold text-[#2AAAE2] font-bold">
                Course Modules
              </h1>
              <div></div>

              {moduleFields.map((mod, index) => (
                <React.Fragment key={mod.id}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-left text-white">
                      Module Title
                    </label>
                    <input
                      {...register(`modules.${index}.title`)}
                      placeholder="Enter module title"
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-left text-white">
                      Video Link
                    </label>
                    <input
                      {...register(`modules.${index}.videoLink`)}
                      placeholder="Enter module video link"
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-left text-white">
                      Description
                    </label>
                    <textarea
                      {...register(`modules.${index}.description`)}
                      placeholder="Enter module description"
                      rows="4"
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Resources inside Module */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-left text-white">
                      Resource Title
                    </label>
                    <input
                      {...register(`modules.${index}.resources.0.title`)}
                      placeholder="Enter resource title"
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <label className="block text-sm font-medium text-left text-white mt-2">
                      Resource Link
                    </label>
                    <input
                      {...register(`modules.${index}.resources.0.link`)}
                      placeholder="Enter resource link"
                      className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="text-[#F79421]"
                  >
                    + Add Module
                  </button>
                </React.Fragment>
              ))}
            </div>

            <div className="p-6">
              <label className="text-left text-lg block mb-5 text-[#2AAAE2] font-bold">
                Course Status
              </label>
              <div className="flex gap-6">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="courseStatus"
                      value={option}
                      checked={status === option}
                      onChange={() => setStatus(option)}
                      className="accent-[#F79421] w-4 h-4"
                    />
                    <span
                      className={`${
                        status === option ? "text-[#F79421]" : "text-white"
                      } text-sm font-medium`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {/* Submit Button */}
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
//           <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
//             Basic Course Information
//           </h1>
//           <div></div>

//           {/* Course Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Course Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               {...register("title", { required: true })}
//               placeholder="Enter course title"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Subtitle */}
//           <div className="mb-4">
//             <label
//               htmlFor="subtitle"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Subtitle
//             </label>
//             <input
//               type="text"
//               id="subtitle"
//               {...register("subtitle", { required: true })}
//               placeholder="Enter course subtitle"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-sm text-left font-medium text-white"
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
//               className="block text-sm font-medium text-left text-white"
//             >
//               Course Route
//             </label>
//             <input
//               type="text"
//               id="route"
//               {...register("route", { required: true })}
//               placeholder="Enter course route"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Category */}
//           <div className="mb-4">
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Course Category
//             </label>
//             <input
//               type="text"
//               id="category"
//               {...register("category", { required: true })}
//               placeholder="Enter course category"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Type */}
//           <div className="mb-4">
//             <label className="block text-sm text-left font-medium text-white mb-2">
//               Course Type
//             </label>
//             <div className="flex items-center gap-6">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   value="online"
//                   {...register("type", { required: true })}
//                   className="form-radio text-[#00FFFF] focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-white">Online</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   value="offline"
//                   {...register("type")}
//                   className="form-radio text-[#00FFFF] focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-white">Offline</span>
//               </label>
//             </div>
//           </div>

//           {/* Intro Video */}
//           <div className="mb-4">
//             <label
//               htmlFor="introVideo"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Intro Video
//             </label>
//             <input
//               type="text"
//               id="introVideo"
//               {...register("introVideo", { required: true })}
//               placeholder="Enter intro video link"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Price */}
//           <div className="mb-4">
//             <label
//               htmlFor="price"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Price
//             </label>
//             <input
//               type="number"
//               id="price"
//               {...register("price", { required: true })}
//               placeholder="Enter price"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Start Date */}
//           <div className="mb-4">
//             <label
//               htmlFor="startdate"
//               className="block text-sm text-left font-medium text-white"
//             >
//               Start Date
//             </label>
//             <input
//               type="date"
//               id="startdate"
//               {...register("startdate", { required: true })}
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Total Class */}
//           <div className="mb-4">
//             <label
//               htmlFor="totalClasses"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Total Class
//             </label>
//             <input
//               type="text"
//               id="totalClasses"
//               {...register("totalClasses", { required: true })}
//               placeholder="Enter total classes"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Duration */}
//           <div className="mb-4">
//             <label
//               htmlFor="duration"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Duration
//             </label>
//             <input
//               type="text"
//               id="duration"
//               {...register("duration", { required: true })}
//               placeholder="Enter duration"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Thumbnail */}
//           <div className="mb-4">
//             <label
//               htmlFor="thumbnail"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Thumbnail
//             </label>
//             <input
//               type="text"
//               id="thumbnail"
//               {...register("thumbnail", { required: true })}
//               placeholder="Enter thumbnail URL"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Instructor */}
//           <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
//             Course Instructor
//           </h1>
//           <div></div>

//           {/* Instructor Name */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorName"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="instructorName"
//               {...register("instructorName", { required: true })}
//               placeholder="Enter instructor name"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Instructor About */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorAbout"
//               className="block text-sm font-medium text-left text-white"
//             >
//               About
//             </label>
//             <input
//               type="text"
//               id="instructorAbout"
//               {...register("instructorAbout", { required: true })}
//               placeholder="Enter instructor about info"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Instructor Image */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorImage"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Image
//             </label>
//             <input
//               type="text"
//               id="instructorImage"
//               {...register("instructorImage", { required: true })}
//               placeholder="Enter instructor image URL"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Instructor Signature */}
//           <div className="mb-4">
//             <label
//               htmlFor="instructorSignature"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Signature
//             </label>
//             <input
//               type="text"
//               id="instructorSignature"
//               {...register("instructorSignature", { required: true })}
//               placeholder="Enter instructor signature"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Resources */}
//           <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
//             Course Resources
//           </h1>
//           <div></div>

//           {/* Facebook Group Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="fbTitle"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Facebook Group Title
//             </label>
//             <input
//               type="text"
//               id="fbTitle"
//               {...register("fbTitle", { required: true })}
//               placeholder="Enter Facebook group title"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Facebook Group Link */}
//           <div className="mb-4">
//             <label
//               htmlFor="fbLink"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Facebook Group Link
//             </label>
//             <input
//               type="text"
//               id="fbLink"
//               {...register("fbLink", { required: true })}
//               placeholder="Enter Facebook group link"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Zoom Class Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="zoomTitle"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Zoom Class Title
//             </label>
//             <input
//               type="text"
//               id="zoomTitle"
//               {...register("zoomTitle", { required: true })}
//               placeholder="Enter Zoom class title"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Zoom Class Link */}
//           <div className="mb-4">
//             <label
//               htmlFor="zoomLink"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Zoom Class Link
//             </label>
//             <input
//               type="text"
//               id="zoomLink"
//               {...register("zoomLink", { required: true })}
//               placeholder="Enter Zoom class link"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Course Modules */}
//           <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
//             Course Modules
//           </h1>
//           <div></div>

//           {/* Module Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="moduleTitle"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Title
//             </label>
//             <input
//               type="text"
//               id="moduleTitle"
//               {...register("moduleTitle", { required: true })}
//               placeholder="Enter module title"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Module Description */}
//           <div className="mb-4">
//             <label
//               htmlFor="moduleDescription"
//               className="block text-sm text-left font-medium text-white"
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
//               className="block text-sm font-medium text-left text-white"
//             >
//               Video Link
//             </label>
//             <input
//               type="text"
//               id="moduleVideo"
//               {...register("moduleVideo", { required: true })}
//               placeholder="Enter module video link"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Resource Title */}
//           <div className="mb-4">
//             <label
//               htmlFor="resourceTitle"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Resource Title
//             </label>
//             <input
//               type="text"
//               id="resourceTitle"
//               {...register("resourceTitle", { required: true })}
//               placeholder="Enter resource title"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Resource Link */}
//           <div className="mb-4">
//             <label
//               htmlFor="resourceLink"
//               className="block text-sm font-medium text-left text-white"
//             >
//               Resource Link
//             </label>
//             <input
//               type="text"
//               id="resourceLink"
//               {...register("resourceLink", { required: true })}
//               placeholder="Enter resource link"
//               className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
