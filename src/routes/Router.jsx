import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/Main/MainLayout";
import Courses from "../pages/Courses";
import AddCourses from "../pages/AddCourses";
import CourseDetails from "../pages/CourseDetails";
import EditCourse from "../pages/EditCourse";
import PaymentReport from "../pages/PaymentReport";

import ViewStudent from "../pages/ViewStudent";
import Notice from "../pages/Notice";
import AddNotice from "../pages/AddNotice";
import AdminPanel from "../pages/AdminPanel";
import RegistrationCard from "../pages/RegistrationCard";
import Certificate from "../pages/Certificate";
import ChangePassword from "../pages/ChangePassword";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";
import CertificateApply from "../pages/CertificateApply";
import AddStudent from "../pages/AddStudent";
import AddMember from "../pages/AddMember";
import ViewMember from "../pages/ViewMember";
import ViewStudents from "../pages/ViewStudents";
import UpdateStudents from "../pages/UpdateStudents";
import UploadRecordedClass from "../pages/UploadRecordedClass";
import ViewRecordedClass from "../pages/ViewRecordedClass";



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
        path: "/uploadClass",
        element: <AdminRoute><UploadRecordedClass></UploadRecordedClass></AdminRoute>,
      },
      {
        path: "/viewClass",
        element: <AdminRoute><ViewRecordedClass></ViewRecordedClass></AdminRoute>,
      },
      {
        path: "/add-student",
        element: <AdminRoute><AddStudent></AddStudent></AdminRoute>,
      },
      {
        path: "/update-student/:id",
        element: <AdminRoute><UpdateStudents></UpdateStudents></AdminRoute>,
      },
      {
        path: "/student",
        element: <AdminRoute><ViewStudents></ViewStudents></AdminRoute>,
      },
      {
        path: "/viewstudent",
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
        path: "/add-member",
        element: <AdminRoute><AddMember></AddMember></AdminRoute>,
      },
      {
        path: "/view-member",
        element: <AdminRoute><ViewMember></ViewMember></AdminRoute>,
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
        path: "/certificate-apply",
        element: <AdminRoute><CertificateApply></CertificateApply></AdminRoute>,
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
