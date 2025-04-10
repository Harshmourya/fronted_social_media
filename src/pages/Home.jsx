import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getPosts } from "../Api/api";
import showToastMessage from "../components/ToastMessage";
import CreatePostButton from "../components/CreatePostButton";

const Home = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await getPosts();
        setPost(response.data);
      } catch (error) {
        showToastMessage("error", error);
      }
    };
    getAllPosts();
  }, []);

  return (
    <>
    
      <div className="p-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <CreatePostButton />
    </>
  );
};

export default Home;
