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
import ChangePassword from "../pages/ChangePassword";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";


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
        element: <AdminRoute><AdminPanel></AdminPanel></AdminRoute>,
      },
      {
        path: "/courses",
        element: <AdminRoute><Courses></Courses></AdminRoute>,
      },
      {
        path: "/add-courses",
        element: <AdminRoute><AddCourses></AddCourses></AdminRoute>,
      },
      {
        path: "/courses/:route",
        element: <AdminRoute><CourseDetails></CourseDetails></AdminRoute>,
      },
      {
        path: "/courses/update/:route",
        element: <AdminRoute><EditCourse></EditCourse></AdminRoute>,
      },
      {
        path: "/payment",
        element: <AdminRoute><PaymentReport></PaymentReport></AdminRoute>,
      },
      {
        path: "/student",
        element: <AdminRoute><ManageStudent></ManageStudent></AdminRoute>,
      },
      {
        path: "/student/:sid",
        element: <AdminRoute><ViewStudent></ViewStudent></AdminRoute>,
      },
      {
        path: "/notice",
        element: <AdminRoute><Notice></Notice></AdminRoute>,
      },
      {
        path: "/add-notice",
        element: <AdminRoute><AddNotice></AddNotice></AdminRoute>,
      },
      {
        path: "/registration",
        element: <AdminRoute><RegistrationCard></RegistrationCard></AdminRoute>,
      },
      {
        path: "/certificate",
        element: <AdminRoute><Certificate></Certificate></AdminRoute>,
      },
      {
        path: "/password-reset",
        element: <AdminRoute><ChangePassword></ChangePassword></AdminRoute>,
      },
    
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);

export default Router;
