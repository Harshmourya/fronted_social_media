import { useEffect, useState } from "react";
import showToastMessage from "../components/ToastMessage";
import PostCard from "../components/PostCard";
import { getPostById, userProfile } from "../Api/api";
import { motion, AnimatePresence } from "framer-motion";
import EditProfile from "../components/EditProfile";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/ContextApi";

function Profile() {
  const navigate = useNavigate();
  const [userPosts, setUserPost] = useState([]);
  const {user , fetchProfile} = useUser();
  const [activeTab, setActiveTab] = useState("posts"); // "posts" or "edit"


  const postByUser = async () => {
    try {
      const res = await getPostById(user);
      setUserPost(res.data);
    } catch (error) {
      showToastMessage("error", error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) postByUser();
  }, [user]);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6  rounded-xl text-black h-screen flex flex-col">
      
      {/* Profile Header */}
      <div className="shadow-md p-3">
        <div className="flex items-center space-x-6">
          <img
            src={
              user.photo ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user.firstname + " " + user.lastname)
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
          />

          <div className="flex-1 pt-5">
            <div className="flex items-center justify-between space-x-4">
              <h2 className="text-xl font-semibold ">{user.username}</h2>
            </div>

            <div className="flex space-x-6 mt-3 text-sm ">
              <div>
                <span className="font-semibold">{userPosts.length}</span> posts
              </div>
            </div>

            <div className="mt-4 text-sm ">
              <span className="font-medium">
                {user.firstname} {user.lastname}
              </span>
              <p>{user.address}</p>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-1 rounded-md text-sm font-medium ${
              activeTab === "posts"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-4 py-1 rounded-md text-sm font-medium ${
              activeTab === "edit"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("createPost")}
            className={`px-4 py-1 rounded-md text-sm font-medium ${
              activeTab === "createPost"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Create Post
          </button>
          
        </div>
      </div>

      {/* Scrollable Tab Content */}
        <div className="mt-6 space-y-4 flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {userPosts.length === 0 ? (
                <p className="text-center text-gray-500">No posts yet.</p>
              ) : (
                userPosts.map((userPost) => (
                  <PostCard key={userPost._id} post={userPost} />
                ))
              )}
            </motion.div>
          )}

          {activeTab === "edit" && (
            <motion.div
              key="edit"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <EditProfile
                user={user}
                onClose={() => setActiveTab("posts")}
                fetchProfile={fetchProfile}
              />
            </motion.div>
          )}
          {activeTab === "createPost" && (
            <motion.div
              key="createPost"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {navigate("/createPost")}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Profile;
