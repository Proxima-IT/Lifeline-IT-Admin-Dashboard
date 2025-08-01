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

        // navigate("/courses");
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
      <h1 className="text-center text-xl font-fold text-blue-800 font-bold">
        Edit the form with Course Information
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:p-10 p-4">
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
              defaultValue={courseData.title}
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
              defaultValue={courseData.subtitle}
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
              defaultValue={courseData.description}
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
              defaultValue={courseData.route}
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
              defaultValue={courseData.category}
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
                  checked={type === "online"}
                  onChange={(e) => setType(e.target.value)}
                  {...register("type", { required: true })}
                  className="form-radio text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Online</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="offline"
                  checked={type === "offline"}
                  onChange={(e) => setType(e.target.value)}
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
              defaultValue={courseData.introVideo}
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
              defaultValue={courseData.price}
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
              defaultValue={courseData.startDate}
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
              defaultValue={courseData.totalClasses}
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
              defaultValue={courseData.duration}
              placeholder="Enter duration"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div></div>
          {/* Thumbnail */}
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Thumbnail
            </label>

            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              {...register("thumbnail", { required: true })}
              // defaultValue={courseData.thumbnail}
              placeholder="Enter thumbnail URL"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  uploadImage(file, "thumbnail");
                }
              }}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <img
            src={courseData?.thumbnail || thumbnail}
            alt="thumbnail"
            className="w-36 h-20 object-cover border border-black shadow"
          />

          {/* Course Instructor */}
          <h1 className="text-left text-lg font-fold text-blue-800 font-bold">
            Course Instructor
          </h1>
          <div></div>

          {instructorFields.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-left text-gray-700">
                    Name
                  </label>
                  <input
                    {...register(`instructors.${index}.name`, {
                      required: true,
                    })}
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
                  <label
                    htmlFor="instructorImage"
                    className="block text-sm font-medium text-left text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    id="instructorImage"
                    type="file"
                    accept="image/*"
                    {...register(`instructors.${index}.image`, {
                      required: true,
                    })}
                    placeholder="Enter instructor image URL"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        uploadImage(file, "instructor");
                      }
                    }}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <img
                  src={
                    instructorImage || courseData?.instructors?.[index]?.image
                  }
                  alt="thumbnail"
                  className="w-36 h-20 object-cover border border-black shadow"
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-left text-gray-700">
                    Signature
                  </label>
                  <input
                    {...register(`instructors.${index}.sign`, {
                      required: true,
                    })}
                    placeholder="Enter instructor signature"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div></div>
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
                  className="text-blue-600"
                >
                  + Add Instructor
                </button>
                <div></div>
              </React.Fragment>
            );
          })}

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
              {/* module title  */}
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
              {/* video link  */}
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
          className="bg-[#0b2a53] hover:bg-[#21579e] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 my-3 w-[80%]"
        >
          Edit Course
        </button>
      </form>
      <button
        onClick={() => {
          handleDelete(route);
        }}
        className="bg-[#b96c16] hover:bg-[#b96d16e0] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 my-3 w-[80%]"
      >
        Delete
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EditCourse;
