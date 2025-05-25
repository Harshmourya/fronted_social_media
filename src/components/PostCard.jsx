import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import showToastMessage from "./ToastMessage";
import { addlike } from "../Api/api";
import ListModal from "./ListModal";
import Comment from "./Comment";
import Follow from "./Follow";
import { useUser } from "../Context/ContextApi";


const PostCard = ({ post }) => {
  const refPost = useRef(null);
  const {currentUser , setFollowerUsername} = useUser()
  const [isLiked, setIsLiked] = useState(false);
  const [postLike, setPostLike] = useState(post.likes);
  const [likedBy, setLikedBy] = useState(post.likedBy || []);
  const [showListModal, setShowListModal] = useState(false);
  const [postComment, setPostComment] = useState(false);

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
      // console.log(res.data.post);
      setPostLike(res.data.post.likes);
      setLikedBy(res.data.post.likedBy);
    } catch (error) {
      showToastMessage("error", error.message);
    }
  };

  return (
    <>
      <div className="max-w-md  mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-gray-200 shadow-black/60">
        {/* Top Bar - Profile Info */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center  ">
            {/* Avatar */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700 uppercase">
              {post.createdBy?.charAt(0)}
            </div>
            {/* CreaterBy or Date */}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800" ref={refPost}>
                {post.createdBy}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })} 
              </p>
            </div>
          </div>
          { currentUser != post.createdBy &&
            <Follow followerUsername={post.createdBy}/>
          }
        </div>

        {/* Title */}
        <div className="px-6 font-semibold text-lg ">
          <p>{post.title}</p>
        </div>

        {/* Post Image */}
        <img
          src={post.photoPost}
          alt={post.title}
          className="w-full aspect-auto -full h-auto object-cover rounded-lg max-h-[500px] "
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
      {postComment && (
        <Comment postId={post._id} onClose={() => setPostComment(false)} />
      )}
    </>
  );
};

export default PostCard;
