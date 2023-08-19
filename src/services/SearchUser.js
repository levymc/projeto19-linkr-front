import axios from "axios";
import { useState } from "react";

export function useSearchUser() {
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async (username) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${username}`
      );
      setSearchResults(response.data);
    } catch (err) {
      alert(err.response.message);
    }
  };

  return { searchResults, fetchSearchResults };
}
