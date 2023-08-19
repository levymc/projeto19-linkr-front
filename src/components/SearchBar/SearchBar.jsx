import React from "react";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import { useSearchUser } from "../../services/search";
import { AiOutlineSearch } from "react-icons/ai";

// Import your styled components from styled.jsx
import {
  Container,
  InputBox,
  SearchContainer,
  OutlineIcon,
  UserBox,
  DebouncedInput,
} from "./styled";

export default function SearchInput({ avatar }) {
  const { searchResults, fetchSearchResults } = useSearchUser();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length >= 3) {
      fetchSearchResults(inputValue);
    }
  };

  console.log(searchResults);

  return (
    <Container>
      <InputBox>
        <DebounceInput
          data-test="search"
          element={DebouncedInput} // Use the styled DebouncedInput here
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
              <h1>{user.name} </h1>
            </UserBox>
          ))}
        </SearchContainer>
      )}
    </Container>
  );
}
