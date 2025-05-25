// src/contexts/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import showToastMessage from "../components/ToastMessage";
import { userProfile } from "../Api/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [followerUsername , setFollowerUsername] = useState('');
  const [posts, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUsername = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.user;
    } catch (error) {
      return null;
    }
  };
  const fetchProfile = async () => {
      try {
        const res = await userProfile();
        setUser(res.data.msg[0]);
        console.log(res.data.msg[0]);
      } catch (error) {
        showToastMessage("error", error.message || "Something went wrong");
      }
    };

  useEffect(() => {
    const userCurrent = getCurrentUsername();
    setCurrentUser(userCurrent);

    fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, posts, setPost,followerUsername , user, setUser ,setFollowerUsername ,  fetchProfile}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
