import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/Main/MainLayout";
import Courses from "../pages/Courses";
import AddCourses from "../pages/AddCourses";
import CourseDetails from "../pages/CourseDetails";
import EditCourse from "../pages/EditCourse";
import PaymentReport from "../pages/PaymentReport";
import ManageStudent from "../pages/ManageStudent";
import ViewStudent from "../pages/ViewStudent";
import Notice from "../pages/Notice";
import AddNotice from "../pages/AddNotice";
import AdminPanel from "../pages/AdminPanel";
import RegistrationCard from "../pages/RegistrationCard";
import Certificate from "../pages/Certificate";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Navigate to="/admin" replace />,
      },
      {
        path: "/admin",
        element: <AdminPanel></AdminPanel>,
      },
      {
        path: "/courses",
        element: <Courses></Courses>,
      },
      {
        path: "/add-courses",
        element: <AddCourses></AddCourses>,
      },
      {
        path: "/courses/:route",
        element: <CourseDetails></CourseDetails>,
      },
      {
        path: "/courses/update/:route",
        element: <EditCourse></EditCourse>,
      },
      {
        path: "/payment",
        element: <PaymentReport></PaymentReport>,
      },
      {
        path: "/student",
        element: <ManageStudent></ManageStudent>,
      },
      {
        path: "/student/:sid",
        element: <ViewStudent></ViewStudent>,
      },
      {
        path: "/notice",
        element: <Notice></Notice>,
      },
      {
        path: "/add-notice",
        element: <AddNotice></AddNotice>,
      },
      {
        path: "/registration",
        element: <RegistrationCard></RegistrationCard>,
      },
      {
        path: "/certificate",
        element: <Certificate></Certificate>,
      },
    
    ],
  },
]);

export default Router;
