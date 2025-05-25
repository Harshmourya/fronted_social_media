import { useState } from "react";
import { followTo } from "../Api/api";
import { useUser } from "../Context/ContextApi";
import showToastMessage from "./ToastMessage";

function follow({ followerUsername }) {
  const { user } = useUser();
  const [isFollow, setIsFollow] = useState(user?.following.includes(followerUsername) ? 'Follwing' : "Follow");

  const FollowTo = async () => {
    try {
      const res = await followTo(followerUsername);
      if (res.status === 200) {
        setIsFollow("Following");
      }
    } catch (e) {
      showToastMessage("error", e);
    }
  };
  return (
    <>
      <div
        className="px-2 rounded-md cursor-pointer shadow-violet-300  hover:scale-105 hover:shadow-md border-2"
        onClick={FollowTo}
      >
        {isFollow}
      </div>
    </>
  );
}

export default follow;
