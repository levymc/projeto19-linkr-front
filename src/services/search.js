import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export function useSearchUser() {
  const { token } = useContext(AuthContext);

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
  };
}
