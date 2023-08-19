import React from "react";
import { DebounceInput } from "react-debounce-input";
import { useSearchUser } from "../../services/search";
import { AiOutlineSearch } from "react-icons/ai";

import {
  Container,
  InputBox,
  SearchContainer,
  OutlineIcon,
  UserBox,
  DebouncedInput,
} from "./styled";

export default function SearchInput({ avatar }) {
  const {
    searchResults,
    fetchSearchResults,
    clearSearchResults,
    notFoundError,
  } = useSearchUser();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length >= 3) {
      fetchSearchResults(inputValue);
    } else {
      clearSearchResults();
    }
  };

  console.log(searchResults);

  return (
    <Container>
      <InputBox>
        <DebounceInput
          data-test="search"
          element={DebouncedInput}
          type="text"
          placeholder="Search for people"
          debounceTimeout={300}
          onChange={handleInputChange}
          required
        />
        <OutlineIcon>
          {" "}
          <AiOutlineSearch name="search-outline" />
        </OutlineIcon>
      </InputBox>
      {searchResults.length > 0 && (
        <SearchContainer id="search-container">
          {searchResults.map((user) => (
            <UserBox
              data-test="user-search"
              href={`/user/${user.userId}`}
              key={user.userId}
            >
              <img src={user.imageUrl} alt="" />
              <h1>{user.name}</h1>
            </UserBox>
          ))}
        </SearchContainer>
      )}
      {notFoundError && (
        <SearchContainer id="search-container">
          <UserBox>
            <h1>No user found.</h1>
          </UserBox>
        </SearchContainer>
      )}
    </Container>
  );
}
