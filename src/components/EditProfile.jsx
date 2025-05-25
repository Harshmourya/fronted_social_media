import { useState } from "react";
import UserForm from "./UserForm";
import { updateProfile } from "../Api/api";
import showToastMessage from "./ToastMessage";

function EditProfile({ user, onClose, fetchProfile }) {
  const [formData, setFormData] = useState(user);

  const inputCss =
    "w-full p-3 bg-[#1e1e1e] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-200 ease-in-out";

  const postUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      const res = await updateProfile(formData);

      if (res.status === 200) {
        setFormData(res.data.msg);
        fetchProfile();
        showToastMessage('success' , 'Profile Upadated');
      } else {
        showToastMessage('error' , 'Profile Not Upadate');
      }
      onClose();

      console.log(res.data);
    } catch (e) {
      showToastMessage("error", e);
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      if (file) setFormData({ ...formData, [e.target.name]: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-8 overflow-y-auto sm:p-6">
        <UserForm
          formData={formData}
          onChange={handleChange}
          onSubmit={postUpdateProfile}
          onClose={onClose}
          showField={true}
          buttonText="Save"
          heading="Update Profile"
        />
      </div>
    </>
  );
}

export default EditProfile;
