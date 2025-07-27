// import axios from "axios";
// import React, { useState } from "react";

// import { FaUpload } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import imageCompression from "browser-image-compression";
// import { useDashboard } from "../hooks/useDashboard";

// const Profile = () => {
//   const { data, isLoading, error } = useDashboard();

//   console.log(data, isLoading, error);

//   const [gender, setGender] = useState(data?.gender || "");
//   const [dob, setDob] = useState(data?.dateOfBirth || "");
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   if (data) {
//   //     setGender(data.gender || "");
//   //   }
//   // }, [data]);

//   async function uploadImage(file) {
//     setLoading(true); // start loading spinner

//     try {
//       const compressedFile = await imageCompression(file, {
//         maxSizeMB: 1, // Compress to 1MB or less
//         maxWidthOrHeight: 1024, // Resize if too large
//         useWebWorker: true,
//       });

//       const formData = new FormData();
//       formData.append("image", compressedFile);

//       const res = await fetch(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (data?.data?.url) {
//         setUploadedImageUrl(data.data.url); // ✅ set URL
//         console.log("Image URL:", data.data.url);
//       }
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     } finally {
//       setLoading(false); // stop loading spinner regardless of success/failure
//     }
//   }

//   // const handleChangeProfile = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData(e.currentTarget);
//   //   const data = Object.fromEntries(formData.entries());
//   //   data.gender = gender;
//   //   data.dateOfBirth = dob;
//   //   console.log(data);

//   //   // for image upload
//   //   const apiKey = "8db0bdbb20cf0dcb90da48fe50bcbe38";

//   //   const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
//   //     method: "POST",
//   //     body: formData,
//   //   });

//   //   const result = await res.json();
//   //   if (result?.data?.url) {
//   //     setUploadedImageUrl(result.data.url); // ✅ set URL
//   //   }
//   //   console.log("Image URL:", result.data.url);

//   //   // submitting profle info
//   //   axios
//   //     .post(`${import.meta.env.VITE_API_URL}/api/dashboard/reset`, result, {
//   //       withCredentials: true,
//   //     })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       if (res.data.success) {
//   //         toast.success(res.data.message, {
//   //           position: "top-center",
//   //           autoClose: 3000,
//   //           closeOnClick: true,
//   //           draggable: false,
//   //           theme: "dark",
//   //         });

//   //         setTimeout(() => {
//   //           navigate("/");
//   //         }, 4000);
//   //       } else {
//   //         toast.error(res.data.message, {
//   //           position: "top-center",
//   //           autoClose: 3000,
//   //           closeOnClick: true,
//   //           draggable: false,
//   //           theme: "dark",
//   //         });
//   //       }
//   //     });
//   // };

//   const handleChangeProfile = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const data = Object.fromEntries(formData.entries());
//     data.gender = gender;
//     data.dateOfBirth = dob;
//     data.image = uploadedImageUrl || data.image || ""; // ✅ Attach uploaded image URL

//     // submitting profile info
//     axios
//       .post(`${import.meta.env.VITE_API_URL}/api/dashboard/reset`, data, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.success) {
//           toast.success(res.data.message, {
//             position: "top-center",
//             autoClose: 3000,
//             theme: "dark",
//           });
//           setTimeout(() => {
//             navigate("/");
//           }, 4000);
//         } else {
//           toast.error(res.data.message, {
//             position: "top-center",
//             autoClose: 3000,
//             theme: "dark",
//           });
//         }
//       })
//       .catch((err) => {
//         toast.error("Something went wrong!");
//         console.error(err);
//       });
//   };

//   return (
//     <div>
//       <div className="max-w-4xl mx-auto  mb-5 p-6 bg-white rounded-xl shadow-md border border-gray-200">
//         <form
//           onSubmit={handleChangeProfile}
//           className="flex flex-col justify-center  md:flex-row gap-10"
//         >
//           {/* Profile Picture */}
//           {/* <div className="flex-shrink-0 flex flex-col items-center">
//             <img
//               src={uploadedImageUrl || data?.image}
//               alt="Profile"
//               className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow"
//             />

//             <h3 className="mt-3 font-bold">{data.name}</h3>
//             <h5 className="text-xs text-gray-700">{data.sid}</h5>

//             <div className="mt-4">
//               <label
//                 htmlFor="imageUpload"
//                 className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg shadow transition duration-200"
//               >
//                 <FaUpload />
//               </label>
//               <input
//                 id="imageUpload"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0]
//                   if (file) {
//                     uploadImage(file)
//                   }
//                 }}
//                 className="hidden"
//               />
//             </div>
//             <input
//               type="hidden"
//               name="image"
//               value={uploadedImageUrl || data?.image}
//             />
//           </div> */}

//           {/* Profile Picture */}

//           <div className="flex-shrink-0 flex flex-col items-center">
//             {loading ? (
//               // Spinner shown while uploading
//               <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-blue-500 shadow">
//                 <span class="loader"></span>
//               </div>
//             ) : (
//               <img
//                 src={uploadedImageUrl || data?.image}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow"
//               />
//             )}

//             <h3 className="mt-3 font-bold">{data.name}</h3>
//             <h5 className="text-xs text-gray-700">{data.sid}</h5>

//             <div className="mt-4">
//               <label
//                 htmlFor="imageUpload"
//                 className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg shadow transition duration-200"
//               >
//                 <FaUpload />
//               </label>
//               <input
//                 id="imageUpload"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     uploadImage(file);
//                   }
//                 }}
//                 className="hidden"
//               />
//             </div>
//             <input
//               type="hidden"
//               name="image"
//               value={uploadedImageUrl || data?.image}
//             />
//           </div>

//           {/* Info Section */}
//           <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 defaultValue={data.name}
//                 className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-800 font-medium"
//               />
//             </div>

//             {/* Email */}
//             <div className="">
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={data.email}
//                 readOnly
//                 className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium cursor-not-allowed"
//               />
//             </div>

//             {/* father name  */}
//             <div>
//               <label className=" block text-sm font-medium text-gray-600 mb-1">
//                 Father's Name
//               </label>
//               <input
//                 type="text"
//                 name="father"
//                 defaultValue={data.father}
//                 className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-800 font-medium "
//               />
//             </div>

//             {/* phone  */}
//             <div>
//               <label className=" block text-sm font-medium text-gray-600 mb-1">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 defaultValue={data.phone}
//                 className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-800 font-medium "
//               />
//             </div>

//             {/* mother name  */}
//             <div>
//               <label className=" block text-sm font-medium text-gray-600 mb-1">
//                 Mother's Name
//               </label>
//               <input
//                 type="text"
//                 name="mother"
//                 defaultValue={data.mother}
//                 className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-800 font-medium "
//               />
//             </div>

//             {/* gender */}
//             <div className="flex flex-col space-y-2">
//               <label className="font-semibold text-gray-700">Gender</label>

//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center space-x-1">
//                   <input
//                     type="radio"
//                     value="Male"
//                     checked={gender === "Male"}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="form-radio text-blue-600 w-5 h-5 cursor-pointer transition duration-300 ease-in-out"
//                     name="gender"
//                   />
//                   <span>Male</span>
//                 </label>

//                 <label className="flex items-center space-x-1">
//                   <input
//                     type="radio"
//                     value="Female"
//                     checked={gender === "Female"}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="form-radio text-pink-500 w-5 h-5 cursor-pointer transition duration-300 ease-in-out"
//                     name="gender"
//                   />
//                   <span>Female</span>
//                 </label>
//               </div>
//             </div>

//             {/* date of birth  */}

//             {/* Date of Birth Field */}
//             <div className="flex flex-col space-y-2">
//               <label htmlFor="dob" className="font-semibold text-gray-700">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 id="dob"
//                 name="dateOfBirth"
//                 defaultValue={data.dateOfBirth}
//                 onChange={(e) => setDob(e.target.value)}
//                 className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer"
//               />
//             </div>
//             <input
//               type="submit"
//               className="w-full bg-[#285599] border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer"
//             />
//           </div>
//         </form>
//       </div>
//       <ToastContainer></ToastContainer>
//     </div>
//   );
// };

// export default Profile;
