// CreatePostButton.jsx
import React, { useState } from 'react';
import UploadPost from '../pages/UploadPost';
import { useNavigate } from 'react-router-dom';

function CreatePostButton() {
    const navigate = useNavigate();

    const navigateHandle = () => navigate('/createPost');
  return (
    <>
      <div
      onClick={navigateHandle}
        className="fixed right-6 bottom-8 bg-violet-600 rounded-4xl h-13 w-13 shadow-xl hover:scale-110 hover:shadow-violet-400 cursor-pointer flex items-center justify-center"
      >
        <img src="/plus.png" alt="add post" />
      </div>
    </>
  );
}

export default CreatePostButton;
