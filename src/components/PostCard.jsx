import React, { useState, useEffect } from "react";
import { ClockFading, Heart, MessageCircle } from "lucide-react";
import showToastMessage from "./ToastMessage";
import { addlike } from "../Api/api";
import ListModal from "./ListModal";
import Comment from "./Comment";

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
  const [postComment, setPostComment] = useState(false)

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
      console.log(res.data.post);
      setPostLike(res.data.post.likes);
      setLikedBy(res.data.post.likedBy);
    } catch (error) {
      showToastMessage("error", error.message);
    }
  };

  return (
    <><div className="max-w-md  mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-gray-200 shadow-black/60">

      {/* Top Bar - Profile Info */}
      <div className="flex items-center px-4 py-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700 uppercase">
          {post.createdBy?.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-800">{post.createdBy}</p>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      {/* Title */}
      <div className="px-6 font-semibold text-lg ">
        <p>{post.title}</p>
      </div>


      {/* Post Image */}
      <img
        src={post.photoPost}
        alt={post.title}
        className="w-full aspect-auto"
      />

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-4">
          {/* Like */}
          <Heart
            className="w-6 h-6 cursor-pointer"
            color={isLiked ? "red" : "black"}
            fill={isLiked ? "red" : "none"}
            onClick={() => onLike(post._id)}
          />
          {/* Comment */}
          <MessageCircle
            className="w-6 h-6 cursor-pointer"
            onClick={() => setPostComment(true)}
          />
        </div>
      </div>

      {/* Likes & Caption */}
      <div className="px-4 py-2">
        <p className="text-sm font-medium text-gray-800">{postLike} likes</p>

        {likedBy.length > 0 && (
          <p
            className="text-sm text-gray-500 mt-1 cursor-pointer hover:underline"
            onClick={() => setShowListModal(true)}
          >
            Liked by {likedBy.slice(0, 2).join(", ")}
            {likedBy.length > 2 && ` and ${likedBy.length - 2} others`}
          </p>
        )}

        {/* Caption */}
        <p className="mt-2 text-sm text-gray-800">
          <span className="font-semibold">{post.createdBy}</span> {post.Des}
        </p>
      </div>

    </div>

      {/* Modal */}
      {showListModal && (
        <ListModal likedBy={likedBy} onClose={() => setShowListModal(false)} />
      )}
      {postComment &&
        <Comment postId={post._id} onClose={() => setPostComment(false)} />

      }
    </>
  );
};

export default PostCard;
