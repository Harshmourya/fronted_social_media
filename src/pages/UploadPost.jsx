import { useState } from "react";
import { createPost } from "../Api/api"; // Assuming the API methods are correctly set up
import showToastMessage from "../components/ToastMessage";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const UploadPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading , setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      showToastMessage("error", "File size should be less than 5MB.");
      return;
    }
    setImage(file); // Store the selected image file
  };

  const checkMissingFields = (fields) =>{

    const missing = Object.entries(fields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

    return missing;
  }

  function navigateHandle (){navigate(-1)};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = checkMissingFields({title ,description, image});

    if (missingFields?.length) {
      showToastMessage("error", `Please fill ${missingFields.join(',')} fields`);
      return;
    }

    if (loading) return; // stop multiple requests 
    setLoading(true)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Des", description);
    if (image) formData.append("photo", image);

    try {
      const response = await createPost(formData); 
      
      if (response.status === 201) {
        showToastMessage("success", "Post Created Successfully");
        navigateHandle();
      } else {
        showToastMessage("error", "Error Occur during create post");
      }
      // console.log("Post created successfully:", response.data);
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post:", err);
      showToastMessage("error", "Failed to create post. Please try again.");
    }finally{
      setLoading(false);
    }
  };


  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
      {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4"> */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex flex-row items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>

<Button onclick={navigateHandle}>
          <img  className="h-9 w-9" src="/cross.png" alt="" />
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* File Upload */}
          <div className="w-full">
            <label
              htmlFor="fileUpload"
              className="
              flex flex-col items-center justify-center gap-3 w-full cursor-pointer
              border-2 border-dashed border-violet-300 py-6 rounded-xl text-violet-600
              hover:border-violet-400 hover:bg-violet-50 transition
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
            value={description}
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
  );
};

export default UploadPost;
