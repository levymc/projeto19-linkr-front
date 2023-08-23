import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { toggleFollow } from "../services/search";

const FollowButton = ({ userIdToFollow }) => {
  console.log("userIdToFollow", userIdToFollow);
  const { token, user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user && user.following) {
      setIsFollowing(user.following.includes(userIdToFollow));
    }
  }, [user, userIdToFollow]);

  const handleFollowToggle = async () => {
    try {
      const response = await toggleFollow(userIdToFollow, token, user.id);
      if (response) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <StyledButton onClick={handleFollowToggle}>
      {isFollowing ? "Follow" : "Unfollow"}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  color: #1877f2;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border-radius: 5px;
  background: #fff;
  border: none;
  border-radius: 5px;

  cursor: pointer;
  width: 112px;
  height: 31px;
  margin-left: -120px;
  margin-top: 36px;
`;

export default FollowButton;
