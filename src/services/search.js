import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export function useSearchUser() {
  const { token } = useContext(AuthContext);

  const [searchResults, setSearchResults] = useState([]);

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
    } catch (err) {
      console.error(err);
      alert("Error fetching user data");
    }
  };

  return { searchResults, fetchSearchResults };
}
