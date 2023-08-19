import React from "react";
import { DebounceInput } from "react-debounce-input";
import { useSearchUser } from "../services/search";

function InputSearch() {
  const { searchResults, fetchSearchResults } = useSearchUser();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length >= 3) {
      fetchSearchResults(inputValue);
    }
  };
  console.log(searchResults);

  return (
    <div>
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        onChange={handleInputChange}
      />
      <ul>
        {searchResults.map((user) => (
          <li key={user.userId}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default InputSearch;
