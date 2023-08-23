import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export function useSearchUser() {
  const { token, user } = useContext(AuthContext);

  const [searchResults, setSearchResults] = useState([]);
  const [notFoundError, setNotFoundError] = useState(false);

  const fetchSearchResults = async (username) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            loggedInUserId: user.id,
          },
        }
      );
      setSearchResults(response.data.users);
      setNotFoundError(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSearchResults([]);
        setNotFoundError(true);
      } else {
        console.error(err);
        alert("Error fetching user data");
      }
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setNotFoundError(false);
  };

  return {
    searchResults,
    notFoundError,
    fetchSearchResults,
    clearSearchResults,
    setSearchResults,
  };
}

export async function toggleFollow(userIdToFollow, token, user) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/toggle-follow`,
      {
        userIdToFollow,
        loggedInUserId: user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error toggling follow status:", error);
    throw error;
  }
}

export async function checkFollow(userId, loggedInUserId, token) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/check-follow/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          loggedInUserId: loggedInUserId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking follow status:", error);
    throw error;
  }
}
