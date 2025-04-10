import React, { useState, useEffect } from "react";
import { ClockFading, Heart, MessageCircle } from "lucide-react";
import showToastMessage from "./ToastMessage";
import { addlike } from "../Api/api";
import ListModal from "./ListModal";

const getCurrentUsername = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    console.log(decoded);
    return decoded.user;
  } catch (error) {
    return null;
  }
};

const PostCard = ({ post }) => {
  const [postLike, setPostLike] = useState(post.likes);
  const [likedBy, setLikedBy] = useState(post.likedBy || []);
  const [showListModal, setShowListModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentUser = getCurrentUsername();

  useEffect(() => {
    if (likedBy.includes(currentUser)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedBy, currentUser]);

  const onLike = async (postId) => {
    try {
      const res = await addlike(postId);
      setPostLike(res.data.post.likes);
      setLikedBy(res.data.post.likedBy);
    } catch (error) {
      showToastMessage("error", error.message);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-[1.01] hover:shadow-xl duration-300 mb-6">
        <img
          src={post.photoPost}
          alt={post.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.Des}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>
              Posted by <span className="font-medium">{post.createdBy}</span>
            </p>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-gray-700">
              {/* Like Section */}
              <div className="flex items-center gap-1">
                <Heart
                  className="w-5 h-5 cursor-pointer"
                  color={isLiked ? "red" : "gray"}
                  fill={isLiked ? "red" : "none"}
                  onClick={() => onLike(post._id)}
                />
                <span>{postLike}</span>
              </div>

              {/* Liked By */}
              {likedBy.length > 0 && (
                <span
                  className="ml-2 text-sm text-gray-500 cursor-pointer hover:underline"
                  onClick={() => setShowListModal(true)}
                >
                  Liked by {likedBy.slice(0, 2).join(", ")}
                  {likedBy.length > 2 && ` and ${likedBy.length - 2} others`}
                </span>
              )}

              {/* Comment Section */}
              <div className="flex items-center gap-1 ml-4">
                <MessageCircle className="w-5 h-5" />
                <span>{post.commentBox.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showListModal && (
        <ListModal likedBy={likedBy} onClose={() => setShowListModal(false)} />
      )}
    </>
  );
};

export default PostCard;
