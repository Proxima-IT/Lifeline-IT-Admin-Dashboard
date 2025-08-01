import React, { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const RegistrationCard = ({ data }) => {
  const [btnLoading, setBtnLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const handleDownload = async (studentId, courseId) => {
    setBtnLoading(true)
    try {
      console.log(studentId, courseId)

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/dashboard/registration`,
        { studentId, courseId },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob", // expect PDF
        }
      )
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement("a")
      a.href = url
      a.download = `${studentId}-registration-card.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log(error)
      if (
        error.response?.status !== 200 &&
        error.response?.data instanceof Blob
      ) {
        const text = await error.response.data.text() // Convert blob to text
        const json = JSON.parse(text)

        console.log(json.error)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: json.error,
        })
      }
    } finally {
      setBtnLoading(false)
    }
  }

  const onSubmit = (formData) => {
    const { sid, courseRoute } = formData
    handleDownload(sid, courseRoute) // assuming courseRoute is also title
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl text-blue-500 font-bold text-center mb-3">
          Registartion Card
        </h1>
        {/* Course Route */}
        <div className="mb-4">
          <label
            htmlFor="courseRoute"
            className="block text-sm font-medium text-left text-gray-700"
          >
            Course Route
          </label>
          <input
            type="text"
            id="courseRoute"
            {...register("courseRoute", { required: true })}
            placeholder="Enter course route"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Student ID */}
        <div className="mb-4">
          <label
            htmlFor="sid"
            className="block text-sm font-medium text-left text-gray-700"
          >
            Student ID
          </label>
          <input
            type="text"
            id="sid"
            {...register("sid", { required: true })}
            placeholder="Enter Student ID"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={btnLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          {btnLoading ? "Downloading..." : "Download Registration Card"}
        </button>
      </form>
    </div>
  )
}

export default RegistrationCard
