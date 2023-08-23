import React, { useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import { useSearchUser, toggleFollow } from "../../services/search";
import { AiOutlineSearch } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom"; // Import Link component

import {
  Container,
  InputBox,
  SearchContainer,
  OutlineIcon,
  UserBox,
  DebouncedInput,
} from "./styled";

export default function SearchInput() {
  const { token, user } = useContext(AuthContext);
  const {
    searchResults,
    fetchSearchResults,
    clearSearchResults,
    notFoundError,
    setSearchResults,
  } = useSearchUser();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length >= 3) {
      fetchSearchResults(inputValue);
    } else {
      clearSearchResults();
    }
  };

  const usersWithisFollowingTrue = searchResults.filter(
    (user) => user.isFollowing === true
  );
  const usersWithoutisFollowingTrue = searchResults.filter(
    (user) => user.isFollowing !== true
  );

  const handleFollowClick = async (userId) => {
    try {
      const updatedResults = searchResults.map((user) => {
        if (user.userId === userId) {
          const isFollowing = !user.isFollowing;
          return { ...user, isFollowing };
        }
        return user;
      });
      setSearchResults(updatedResults);
      await toggleFollow(userId, token, user.id);
    } catch (error) {
      console.error("Error toggling follow status:", error);
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
          <AiOutlineSearch name="search-outline" />
        </OutlineIcon>
      </InputBox>
      {(usersWithisFollowingTrue.length > 0 ||
        usersWithoutisFollowingTrue.length > 0) && (
        <SearchContainer id="search-container">
          {usersWithisFollowingTrue.map((user) => (
            <UserBox data-test="user-search" key={user.userId}>
              <img src={user.imageUrl} alt="" />
              <Link to={`/user/${user.userId}`}>
                <h1>{user.name}</h1>
              </Link>
              <button onClick={() => handleFollowClick(user.userId)}>
                • following
              </button>
            </UserBox>
          ))}
          {usersWithoutisFollowingTrue.map((user) => (
            <UserBox data-test="user-search" key={user.userId}>
              <img src={user.imageUrl} alt="" />
              <Link to={`/user/${user.userId}`}>
                <h1>{user.name}</h1>
              </Link>
              <button onClick={() => handleFollowClick(user.userId)}>
                follow
              </button>
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
