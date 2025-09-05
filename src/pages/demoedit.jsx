import React from "react";

const demoedit = () => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              Course Title
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
              {...register("subtitle", { required: true })}
              placeholder="Enter course subtitle"
              className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm text-left font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              defaultValue={courseData.description}
              {...register("description", { required: true })}
              placeholder="Enter course description"
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
                  // checked={type === "online"}
                  onChange={(e) => setType(e.target.value)}
                  {...register("type", { required: true })}
                  className="form-radio text-[#00FFFF] focus:ring-blue-500"
                />
                <span className="ml-2 text-white">Online</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="offline"
                  // checked={type === "offline"}
                  onChange={(e) => setType(e.target.value)}
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
              defaultValue={courseData.price}
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
              {...register("rating", { required: true })}
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
              defaultValue={courseData.introVideo}
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
              defaultValue={courseData.startDate}
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
              defaultValue={courseData.totalClasses}
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
              defaultValue={courseData.duration}
              placeholder="Enter duration"
              className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Thumbnail */}
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-left text-white"
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
              className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <img
            src={courseData?.thumbnail || thumbnail}
            alt="thumbnail"
            className="w-36 h-20 object-cover border border-[#00FFFF] shadow"
          />

          {/* Course Instructor */}
          <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
            Course Instructor
          </h1>
          <div></div>

          {instructorFields.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-left text-white">
                    Name
                  </label>
                  <input
                    {...register(`instructors.${index}.name`, {
                      required: true,
                    })}
                    placeholder="Enter instructor name"
                    className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-left text-white">
                    About
                  </label>
                  <input
                    {...register(`instructors.${index}.about`, {
                      required: true,
                    })}
                    placeholder="Enter instructor about info"
                    className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="instructorImage"
                    className="block text-sm font-medium text-left text-white"
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
                    className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <img
                  src={
                    instructorImage || courseData?.instructors?.[index]?.image
                  }
                  alt="thumbnail"
                  className="w-36 h-20 object-cover border border-[#00FFFF] shadow"
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-left text-white">
                    Signature
                  </label>
                  <input
                    {...register(`instructors.${index}.sign`, {
                      required: true,
                    })}
                    placeholder="Enter instructor signature"
                    className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="text-[#00FFFF]"
                >
                  + Add Instructor
                </button>
                <div></div>
              </React.Fragment>
            );
          })}

          <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
            Course Resourses
          </h1>
          <div></div>
          {/* 🔗 FB & Zoom Links Section */}
          <div className="mb-4">
            <label className="block text-sm text-left font-medium text-white mb-2">
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
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  {...register(`links[0].fb.${index}.link`, {
                    required: true,
                  })}
                  type="url"
                  placeholder="FB Link URL"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="text-[#00FFFF] text-sm hover:underline mt-1 ml-2"
                >
                  + Add Facebook Link
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-left font-medium text-white mb-2">
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
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  {...register(`links[0].zoom.${index}.link`, {
                    required: true,
                  })}
                  type="url"
                  placeholder="Zoom Link URL"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="text-[#00FFFF] text-sm hover:underline mt-1 ml-2"
                >
                  + Add Zoom Link
                </button>
              </div>
            ))}
          </div>

          <h1 className="text-left text-lg font-fold text-[#00FFFF] font-bold">
            Course Modules
          </h1>
          <div></div>

          {moduleFields.map((mod, index) => (
            <React.Fragment key={mod.id}>
              {/* module title  */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-white">
                  Module Title
                </label>
                <input
                  {...register(`modules.${index}.title`, {
                    required: true,
                  })}
                  placeholder="Enter module title"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {/* video link  */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-white">
                  Video Link
                </label>
                <input
                  {...register(`modules.${index}.videoLink`, {
                    required: true,
                  })}
                  placeholder="Enter module video link"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-white">
                  Description
                </label>
                <textarea
                  {...register(`modules.${index}.description`, {
                    required: true,
                  })}
                  placeholder="Enter module description"
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Resources inside Module */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-left text-white">
                  Resource Title
                </label>
                <input
                  {...register(`modules.${index}.resources.0.title`, {
                    required: true,
                  })}
                  placeholder="Enter resource title"
                  className="mt-1 block w-full px-4 py-2 bg-[#8995A3] text-white placeholder-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <label className="block text-sm font-medium text-left text-white mt-2">
                  Resource Link
                </label>
                <input
                  {...register(`modules.${index}.resources.0.link`, {
                    required: true,
                  })}
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
                className="text-[#00FFFF]"
              >
                + Add Module
              </button>
            </React.Fragment>
          ))}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#0052CC] hover:bg-[#0052CC] text-white font-bold py-2  px-4 rounded-md transition-all duration-300 my-3 w-[80%]"
        >
          Edit Course
        </button>
      </form>
    </div>
  );
};

export default demoedit;
