import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
const EditCourse = () => {
  const [courseData, setCourseData] = useState({});
  const [type, setType] = useState(courseData?.type || "");
  const [instructor, setInstructor] = useState([]);
  const [fblinks, setFbLinks] = useState([]);

    const [status, setStatus] = useState("Published");
  
    const options = ["Draft", "Published", "Archived"];

  const [thumbnail, setThumbnail] = useState("");
  const [instructorImage, setInstructorImage] = useState("");
  console.log(fblinks);

  const { route } = useParams();
  // console.log(route);

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
      watch,
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
      type: courseData.type,
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/courses/${route}`)
      .then((res) => {
        // console.log(res.data.instructors[0].name);
        setCourseData(res.data);
        setInstructor(res.data.instructors);
        // setFbLinks(res.data.links?.[0].fb)
        reset({
          instructors: res.data.instructors || [],
          links: [
            {
              fb: res.data.links?.[0]?.fb || [{ title: "", link: "" }],
              zoom: res.data.links?.[0]?.zoom || [{ title: "", link: "" }],
            },
          ],

          modules: res.data.modules || [
            {
              title: "",
              description: "",
              videoLink: "",
              resources: [{ title: "", link: "" }],
            },
          ],
          type: res.data.type || "",
        });
      });
  }, []);

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
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false); // stop loading spinner regardless of success/failure
    }
  }

  const onSubmit = (data) => {
    // console.log(data);

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/courses/update/${route}`,
        data
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Course updated successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/courses");
        }, 3000);
      });
  };

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
            }),
            navigate("/courses")
          );
      }
    });
  };
  return (
    <div className="my-5">
      <main className="flex-1  overflow-y-auto w-full">
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-[80%] lg:w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          Edit Courses
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-2xl p-3 lg:p-6 my-3 mx-4 lg:mx-10">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                   defaultValue={courseData.title}
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
                   defaultValue={courseData.subtitle}
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
                src={courseData?.thumbnail || thumbnail}
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
                  defaultValue={courseData.description}
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
                  defaultValue={courseData.route}
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
                  defaultValue={courseData.category}
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
                  defaultValue={courseData.price}
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
                  defaultValue={courseData.introVideo}
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
                  defaultValue={courseData.startDate}
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
                  defaultValue={courseData.totalClasses}
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
                    defaultValue={courseData.duration}
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
          <button
            onClick={() => {
              handleDelete(route);
            }}
            className="bg-[#e38213] hover:bg-[#F79421] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 my-3 w-[60%]"
          >
            Delete
          </button>
        </div>
      </main>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EditCourse;
