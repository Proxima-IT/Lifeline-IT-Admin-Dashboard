import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewStudent = () => {
  const [studentDetails, setStudentDetails] = useState({});
  const [totalOrders, setTotalOrders] = useState([]);
  const navigate = useNavigate();

  const { sid } = useParams();
  // console.log(sid);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/student/${sid}`)
      .then((res) => {
        console.log(res.data.student);
        setStudentDetails(res.data.student);
      });
  }, []);

  console.log(totalOrders);

  useEffect(() => {
    if (!studentDetails?.totalOrders) return;

    const fetchOrders = async () => {
      const responses = await Promise.all(
        studentDetails.totalOrders.map((order) =>
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/courses/id/${order.courseId}`
          )
        )
      );

      const ordersData = responses.map((res) => res.data);

      setTotalOrders(ordersData);
    };

    fetchOrders();
  }, [studentDetails]);

  console.log(studentDetails?.sid);
  
  // https://api.lifelineitinstitute.com/api/courses/id/688748959802d0cef1244124
  // {  name,
  //     email,
  //     phone,
  //     password  }

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const phone = form.phone.value;
    const courseRoute = form.courseRoute.value;
    const studentData = { email, phone, courseRoute };
    console.log(studentData);
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/student/update/${
          studentDetails.sid
        }`,
        studentData
      )
      .then((res) => console.log(res.data));
  };

  const handleDelete = (sid) => {
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
          .delete(`${import.meta.env.VITE_API_URL}/api/student/delete/${sid}`)
          .then(
            Swal.fire({
              title: "Deleted!",
              text: "Your Course has been deleted.",
              icon: "success",
            }),
            navigate("/student")
          );
      }
    });
  };

  return (
    <div>
      <main className="flex-1  overflow-y-auto w-full">
        <div className="text-2xl font-bold text-white mb-4 bg-[#1398DB] w-1/4 px-3 py-2 my-[15px]  mx-auto rounded-md">
          View All Students
        </div>

        <div className="bg-[#132949] border border-[#00B5FF] rounded-lg p-6 my-3 mx-10">
          {/* // main dynamic content goes here */}
          <h1 className="text-2xl font-bold text-[#285599] mb-4">
            {" "}
            Student Information
          </h1>
          <div className="bg-white border grid grid-cols-2 gap-3 border-amber-400 rounded-md shadow-md w-full p-5 text-left">
            <div>
              <img src={studentDetails?.image} alt="" className="w-1/3  mb-3" />
              <span className="ml-5 font-bold text-center text-blue-900">
                {studentDetails?.sid}
              </span>
            </div>
            <div>
              <p className="font-bold text-2xl">{studentDetails?.name}</p>
              <p>
                {" "}
                <span className="font-bold text-lg mr-3">Father:</span>
                {studentDetails?.father}
              </p>
              <p>
                {" "}
                <span className="font-bold text-lg mr-3">Mother:</span>
                {studentDetails?.mother}
              </p>
              <p>
                {" "}
                <span className="font-bold text-lg mr-3">Date of Birth:</span>
                {studentDetails?.dateOfBirth
                  ? moment(studentDetails.dateOfBirth).format("MMMM Do YYYY")
                  : "N/A"}
              </p>
              <p>
                {" "}
                <span className="font-bold text-lg mr-3">Gender:</span>
                {studentDetails?.gender}
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
                    defaultValue={studentDetails?.email}
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
                    defaultValue={studentDetails?.phone}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium "
                  />
                </div>

                <div>
                  <label className=" block text-sm font-medium text-left text-gray-600 mb-1">
                    Course Route
                  </label>
                  <input
                    type="text"
                    name="courseRoute"
                    // defaultValue={studentDetails?.totalOrders}

                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-500 font-medium "
                  />
                </div>
                {/* phone  */}
                <input
                  // onClick={handleUpdate}
                  type="submit"
                  value="Edit"
                  className="w-full col-span-2 bg-[#285599] text-center my-2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-white hover:bg-[#3a6fbf] transition-all duration-300 font-medium cursor-pointer"
                />
              </div>
            </form>

            <div className="overflow-x-auto ">
              <table className="w-full text-left border-separate border-spacing-y-4">
                {/* <colgroup>
            <col />

            <col className="" />
          </colgroup> */}
                <thead className=" bg-gradient-to-l from-[#0B254C] via-[#266ea1] to-[#041630] text-white ">
                  <tr className="text-center text-base ">
                    <th className="p-3 text-left">Course Name</th>
                  </tr>
                </thead>
                <tbody className="pt-10">
                  {totalOrders.map((course) => (
                    <tr
                      key={course._id}
                      className=" border-b font-bold border-gray-300 pt-3"
                    >
                      <td className="p-3 text-left mt-10 border-b border-gray-300">
                        <p className="text-[#0B254C]">{course.title}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => {
                handleDelete(sid);
              }}
              className="bg-[#b96c16] col-span-2 hover:bg-[#b96d16e0] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 w-full"
            >
              Delete
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewStudent;
