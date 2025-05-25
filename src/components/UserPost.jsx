import { useState } from "react";
import Button from "./Button";
import InputBox from "./InputBox";

function UserPost({
    postData,
    navigateHandle,
    handleSubmit,
    setTitle,
    handleFileChange,
    setDescription,
    loading,
}
) {
    const [showOptions, setShowOptions] = useState(false);
  return (

    <>
      <div className=" fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
        {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4"> */}
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex flex-row items-center justify-between border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Post
            </h2>

            <Button onclick={navigateHandle}>
              <img className="h-9 w-9" src="/cross.png" alt="Cross" />
            </Button>
          </div>
          

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-5"
          >
            
            {/* Title Input */}
            <InputBox
              type="text"
              placeholder="Enter Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={postData?.title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* File Upload */}
            <div className="w-full">
              <label
                htmlFor="fileUpload"
                className="
              flex flex-col items-center justify-center gap-3 w-full cursor-pointer
              border-2 border-dashed border-violet-300 py-6 rounded-xl text-violet-600 
              hover:border-violet-400 hover:bg-violet-300 transition
            "
              >
                <img
                  src="/icons8-upload-48.png"
                  alt="upload icon"
                  className="w-10 h-10 mx-auto "
                />
                <span className="text-sm font-medium">
                  Click or drag to upload image
                </span>
              </label>

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Caption */}
            <textarea
              placeholder="Write a caption..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none h-28 focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={postData?.description }
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 rounded-xl transition shadow-sm"
              text={loading ? "Posting..." : "Share Post"}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default UserPost;
