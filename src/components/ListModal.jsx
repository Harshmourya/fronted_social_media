// src/components/LikesModal.jsx
import React from "react";

const ListModal = ({ likedBy = [], onClose }) => {
  return (
    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white/40 p-5 rounded-xl w-80 max-h-[400px] shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Liked By</h2>
          <img
            src="/cross.png"
            alt="Close"
            className="w-5 h-5 cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Scrollable List */}
        <div className="space-y-2 overflow-y-auto max-h-[100px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 font-bold">
          {likedBy.length === 0 ? (
            <p className="text-gray-500 text-xs">No likes yet.</p>
          ) : (
            likedBy.map((user, idx) => (
              <p key={idx} className="text-gray-700 text-xs ">
                {user}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListModal;
