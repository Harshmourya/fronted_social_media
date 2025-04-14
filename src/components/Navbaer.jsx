import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-violet-500 border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full ">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or App Name */}
        <Link to="/" className="text-xl font-bold text-white">
          MyApp
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-white transition duration-700 ease-in-out font-medium border-transparent hover:border-y-2 hover:border-white"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="text-white transition duration-700 ease-in-out font-medium border-transparent hover:border-y-2 hover:border-white "
          >
            Profile
          </Link>

          {/* Conditional Logout */}
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition hover:cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
