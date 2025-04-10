import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.commentBox);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const addComment = async () => {
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:3000/api/posts/${id}/comment`, { text: comment }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComment("");
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      {post && (
        <>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p>{post.Des}</p>
          <h3 className="mt-4 font-bold">Comments</h3>
          {comments.map((c) => (
            <p key={c._id} className="border p-2 rounded my-2">{c.text}</p>
          ))}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full mt-2"
            placeholder="Add a comment..."
          />
          <button onClick={addComment} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Comment</button>
        </>
      )}
    </div>
  );
};

export default PostDetail;
