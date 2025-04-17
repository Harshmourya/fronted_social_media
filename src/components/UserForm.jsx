import InputBox from "./InputBox";
import Button from "./Button";
import { Link } from "react-router-dom"; // Optional: Only if you're using React Router

const inputCss =
  "w-full p-3 bg-[#1e1e1e] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 hover:scale-105 focus:outline-none ";

function UserForm({
  formData,
  onChange,
  onSubmit,
  onClose,
  buttonText = "Submit",
  heading,
  showPhotoUpload = false,
  showLoginLink = false,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`w-full 
        max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl 
        text-white 
        backdrop-blur-lg 
        bg-black 
        rounded-xl 
        shadow-lg 
        border border-white/10 
        p-4 sm:p-6 lg:p-8 
        space-y-4 sm:space-y-5 lg:space-y-6 
        ${onClose ? '' : 'ring-2 ring-violet-600/50'}
      `}
      >
      <div className={`flex items-center ${onClose ? 'justify-between' : 'justify-center'}`}>

      <h2 className="text-2xl font-semibold text-white text-center">
        {heading}
      </h2>
      {onClose&& <img src="/cross.png" alt="" onClick={onClose}  className="w-9 h-9 hover:cursor-pointer hover:bg-white/40 p-1 rounded-full transition duration-200 ease-in-out"/>
      }
      </div>

      {/* 👤 Photo Upload - Only for settings */}
      {showPhotoUpload && (
        <div className="flex flex-col gap-2">
          <label htmlFor="photo" className="text-sm font-medium text-gray-300">
            Upload Profile Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            className="text-sm text-gray-200 file:bg-teal-600 file:border-none file:rounded file:px-3 file:py-1 file:text-white"
            onChange={onChange} // <-- make sure this prop is coming
          />
        </div>
      )}

      {/* 🧑 First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputBox
          type="text"
          name="firstname"
          value={formData.firstname}
          placeholder="First Name"
          label="First Name"
          className={inputCss}
          onChange={onChange}
          required
        />
        <InputBox
          type="text"
          name="lastname"
          value={formData.lastname}
          placeholder="Last Name"
          label="Last Name"
          className={inputCss}
          onChange={onChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 👤 Username */}
        <InputBox
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          label="Username"
          className={inputCss}
          onChange={onChange}
          required
        />

        {/* 📱 Phone */}
        <InputBox
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          label="Phone"
          className={inputCss}
          onChange={onChange}
        />
      </div>

      {/* 📧 Email & Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputBox
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          label="Email"
          className={inputCss}
          onChange={onChange}
          required
        />
        <InputBox
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          label="Password"
          className={inputCss}
          onChange={onChange}
          required
        />
      </div>

      {/* 🏠 Address */}
      <InputBox
        type="text"
        name="address"
        value={formData.address}
        placeholder="Address"
        label="Address"
        className={inputCss}
        onChange={onChange}
      />

      {/* ✅ Submit Button */}
      <Button
        type="submit"
        className="w-full bg-violet-600 p-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
        text={buttonText}
      />

      {/* 🔗 Login Link - Only on Register page */}
      {showLoginLink && (
        <div className="text-center w-full flex justify-between  text-md text-white">
          <Link
            to="/login"
            className="hover:underline hover:text-blue-500 hover:scale-110 focus:text-white font-medium"
          >
            Already have an account?{" "}
          </Link>
          <Link
            to="/login"
            className="hover:underline hover:scale-110 hover:text-blue-500 font-medium"
          >
            Sign in
          </Link>
        </div>
      )}
    </form>
  );
}

export default UserForm;
