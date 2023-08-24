import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { toggleFollow, checkFollow } from "../services/search";

const FollowButton = ({ userIdToFollow }) => {
  console.log("userIdToFollow", userIdToFollow);
  const { token, user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (user && user.id) {
        try {
          const followStatus = await checkFollow(
            userIdToFollow,
            user.id,
            token
          );
          setIsFollowing(followStatus);
        } catch (error) {
          window.alert(
            "Failed to perform the operation. Please try again later."
          );

          console.error("Error fetching follow status:", error);
        }
      }
    };

    fetchFollowStatus();
  }, [userIdToFollow, user, token]);

  const handleFollowToggle = async () => {
    try {
      setIsLoading(true);
      const response = await toggleFollow(userIdToFollow, token, user.id);
      if (response) {
        setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      }
    } catch (error) {
      window.alert("Failed to perform the operation. Please try again later.");
      console.error("Error toggling follow status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledButton
      onClick={handleFollowToggle}
      disabled={isLoading || !user}
      data-test="follow-btn"
    >
      {isLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
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
