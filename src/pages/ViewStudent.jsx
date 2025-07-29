import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewStudent = () => {
  const [studentDetails, setStudentDetails] = useState({});

  const { sid } = useParams();
  // console.log(sid);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/student/${sid}`)
      .then((res) => {
        // console.log(res.data.user);
        setStudentDetails(res.data.user);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#285599] mb-4">
        {" "}
        Student Information
      </h1>
      <div className="bg-white border grid grid-cols-2 gap-3 border-amber-400 rounded-md shadow-md w-full p-5 text-left">
        <div>
          <img
            src={studentDetails.image}
            alt=""
            className="w-1/4 rounded-full mb-3"
          />
          <span className="ml-4">{studentDetails.sid}</span>
        </div>
        <div>
          <p className="font-bold text-2xl">{studentDetails.name}</p>
          <p>
            {" "}
            <span className="font-bold text-lg mr-3">Father:</span>
            {studentDetails.father}
          </p>
          <p>
            {" "}
            <span className="font-bold text-lg mr-3">Mother:</span>
            {studentDetails.mother}
          </p>
          <p>
            {" "}
            <span className="font-bold text-lg mr-3">Date of Birth:</span>
            {studentDetails.dateOfBirth}
          </p>
          <p>
            {" "}
            <span className="font-bold text-lg mr-3">Gender:</span>
            {studentDetails.gender}
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-5  p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-[#285599] mb-4">
          Update Student Information
        </h1>
        <form
          onSubmit={handleUpdate}
          className="flex flex-col justify-center  md:flex-row gap-10"
        >
          {/* Profile Picture */}
          <div className="flex-shrink-0 flex flex-col items-center">
            {/* <h3 className="mt-3 font-bold">{data.name}</h3> */}
            {/* <h5 className="text-xs text-gray-700">{data.sid}</h5> */}

            <input
              type="hidden"
              name="image"
              //   value={uploadedImageUrl || data?.image}
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
            {/* Email */}
            <div className="">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                // value={data.email}

                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium"
              />
            </div>

            {/* phone  */}
            <div>
              <label className=" block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                // defaultValue={data.phone}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-800 font-medium "
              />
            </div>

            <input
              type="submit"
              value="Edit"
              className="w-full col-span-2 bg-[#285599] border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewStudent;
