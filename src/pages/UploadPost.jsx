import { useState } from "react";
import { createPost } from "../Api/api"; // Assuming the API methods are correctly set up
import showToastMessage from "../components/ToastMessage";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import UserPost from "../components/UserPost";

const UploadPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      showToastMessage("error", "File size should be less than 5MB.");
      return;
    }
    setImage(file); // Store the selected image file
  };

  const checkMissingFields = (fields) => {
    const missing = Object.entries(fields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    return missing;
  };

  function navigateHandle() {
    navigate(-1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = checkMissingFields({ title, description, image });

    if (missingFields?.length) {
      showToastMessage(
        "error",
        `Please fill ${missingFields.join(",")} fields`
      );
      return;
    }

    if (loading) return; // stop multiple requests
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Des", description);
    if (image) formData.append("photo", image);

    try {
      const response = await createPost(formData);

      if (response.status === 201) {
        showToastMessage("success", "Post Created Successfully");
        console.log('object');
      } else {
        showToastMessage("error", "Error Occur during create post");
      }
      navigateHandle();
      // console.log("Post created successfully:", response.data);
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post:", err);
      showToastMessage("error", "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPost
      navigateHandle={navigateHandle}
      handleSubmit={handleSubmit}
      setTitle={setTitle}
      handleFileChange={handleFileChange}
      setDescription={setDescription}
      loading={loading}
    />
  );
};

export default UploadPost;
