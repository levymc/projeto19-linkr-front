import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useSearchUser } from "../services/search";

function SearchUserComponent() {
  const { searchResults, fetchSearchResults } = useSearchUser();

  const handleSearch = (username) => {
    if (username.length >= 3) {
      fetchSearchResults(username);
    }
  };

  const handleConsoleLog = () => {
    console.log(searchResults);
  };

  return (
    <div>
      <DebounceInput
        type="text"
        placeholder="Enter username"
        debounceTimeout={300}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button onClick={handleConsoleLog}>Log to Console</button>
      <div>
        {searchResults.map((user) => (
          <div key={user.email}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default SearchUserComponent;
