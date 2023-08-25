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
      window.alert("Failed to perform the operation. Please try again later.");
      console.error("Error toggling follow status:", error);
    }
  };

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
            <UserBox key={user.userId}>
              <img src={user.imageUrl} alt="" />
              <Link data-test="user-search" to={`/user/${user.userId}`}>
                <h1>{user.name}</h1>
                <h2>{user.isFollowing ? "following" : "follow"}</h2>
              </Link>
              {/* <button onClick={() => handleFollowClick(user.userId)}> */}
              {/* </button> */}
            </UserBox>
          ))}
          {usersWithoutisFollowingTrue.map((user) => (
            <UserBox key={user.userId}>
              <img src={user.imageUrl} alt="" />
              <Link data-test="user-search" to={`/user/${user.userId}`}>
                <h1>{user.name}</h1>
                <h2>{user.isFollowing ? "following" : "follow"}</h2>
              </Link>
              {/* <button onClick={() => handleFollowClick(user.userId)}> */}
              {/* </button> */}
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
