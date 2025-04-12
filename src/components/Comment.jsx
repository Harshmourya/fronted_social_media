import { useEffect, useState } from "react";
import { createComment, getComments } from "../Api/api";
import InputBox from "./InputBox";
import Button from './Button';
import showToastMessage from "./ToastMessage";

function Comment({ postId, onClose }) {
    const [commentData, setCommentData] = useState("");
    const [commentsArray, setCommentsArray] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPostComments = async () => {
        try {
            const res = await getComments(postId);
            setCommentsArray(res.data.msg);
        } catch (error) {
            showToastMessage("error", "Failed to load comments.");
        }
    };

    useEffect(() => {
        getPostComments();
    }, []);

    const commentOnPost = async () => {
        if (!commentData) {
            showToastMessage("error", "Please Write a Comment..");
            return;
        }
        if (loading) return;

        setLoading(true);
        try {
            const res = await createComment({ postId, text: commentData.trim() });
            if (res.status === 201) {
                showToastMessage("success", `Commented on post`);
                setCommentData(""); // Clear input after comment
                getPostComments();  // Refresh comments
            } else {
                showToastMessage("error", `Server response: ${res.data}`);
            }
        } catch (error) {
            showToastMessage("error", error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-xs bg-opacity-40 z-50">
                <div className="w-full max-w-md flex flex-col items-center rounded-3xl h-screen max-h-[50vh] border-2 border-gray-200 shadow-lg bg-white ">
                    {/* Header */}
                    <div className="w-full flex justify-between p-4 border-b-2 border-gray-200 rounded-t-3xl">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Comments {loading ? "(Loading...)" : `(${commentsArray.length})`}
                        </h1>
                        <img
                            src="/cross.png"
                            alt="Close"
                            className="h-8 w-8 hover:cursor-pointer hover:bg-gray-200 p-1 rounded-full transition duration-200 ease-in-out"
                            onClick={onClose}
                        />
                    </div>

                    {/* Comments list */}
                    <div className="flex-1 w-full p-4 overflow-y-auto space-y-4  ">
                        {commentsArray.length ? (
                            commentsArray.map((user, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded-xl shadow-sm shadow-gray-600">
                                    <p className="text-blue-700 text-sm font-semibold">{user.commentedBy}</p>
                                    <p className="text-gray-600 text-base">{user.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No comments yet.</p>
                        )}
                    </div>

                    {/* Input + Send */}
                    <div className="w-full flex items-center p-3 bg-gray-50 rounded-b-2xl shadow-inner">
                        <InputBox
                            onChange={(e) => setCommentData(e.target.value)}
                            className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                            type="text"
                            placeholder={loading ? "Commenting..." : "Write a comment..."}
                            value={commentData}
                        />
                        <Button className="ml-1 p-1 text-white rounded-full transition duration-200 ease-in-out" >

                            <img
                                src="/send.png"
                                alt="Send"
                                className="h-8 w-8 mx-2 my-1 hover:cursor-pointer hover:bg-gray-200 p-1 rounded-full transition duration-200 ease-in-out"
                                onClick={commentOnPost}
                            />
                        </Button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Comment;
