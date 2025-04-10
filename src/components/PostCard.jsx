import React from "react";
import { Heart, MessageCircle } from "lucide-react";

const PostCard = ({ post }) => {
  return (
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
          <p>Posted by <span className="font-medium">{post.createdBy}</span></p>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-gray-700">
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span>{post.commentBox.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
