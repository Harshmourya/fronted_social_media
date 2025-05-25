
const ListModal = ({ likedBy = [], onClose }) => {
  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    
  <div className="bg-white border border-white/20 backdrop-blur-xl shadow-2xl rounded-2xl w-96 max-h-[450px] p-5 text-black relative overflow-hidden animate-fade-in">

    {/* Close Button */}
    
    <button
      onClick={onClose}
      className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition"
    >
      <img src="/cross.png" alt="Close" className="h-9 w-9 hover:cursor-pointer hover:bg-gray-200 p-1 rounded-full transition duration-200 ease-in-out" />
    </button>

    {/* Header */}
    <h2 className="text-2xl font-bold mb-4 border-b border-white/20 pb-2">
      ❤️ Liked By
    </h2>

    {/* Scrollable List */}
    <div className="space-y-3 overflow-y-auto max-h-[250px] pr-1 py-2 scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent">
      {likedBy.length === 0 ? (
        <p className="text-black/70 text-sm">No likes yet.</p>
      ) : (
        likedBy.map((user, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl shadow-black/80 shadow-sm "
          >
            {/* Profile Initial Circle */}
            <div className="bg-black/10 text-balck font-semibold w-9 h-9 flex items-center justify-center rounded-full uppercase">
              {user.charAt(0)}
            </div>
            {/* Username */}
            <p className="text-sm font-medium">{user}</p>
          </div>
        ))
      )}
    </div>
  </div>
</div>

    </>
  );
};

export default ListModal;
