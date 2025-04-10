// src/components/LikesModal.jsx
import React from "react";

const ListModal = ({ likedBy, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-80 max-h-96 overflow-y-auto shadow-md">
        <div className="flex flex-row items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Liked By</h2>
          <img
            src="/cross.png"
            alt="Close"
            className="w-6 h-6 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="mt-2 space-y-1">
          {likedBy.map((user, idx) => (
            <h5 key={idx} className="text-gray-700 pb-1">{user}</h5>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListModal;
