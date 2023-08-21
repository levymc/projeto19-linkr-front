import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeButton = ({ userId, postId, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async (userId, postId) => {
    try {
      setLoading(true);
      console.log("postId");
      await axios.post(`${process.env.REACT_APP_API_URL}/like`, {
        userId,
        postId,
      });
      setLiked(!liked);
    } catch (err) {
      console.error("Erro ao curtir a postagem", err);
    } finally {
      setLoading(false);
    }
  };

  // const handleLike = () => {
  //     setLiked(!liked);
  // }

  return (
    <ContainerLikes onClick={() => handleLike(3, 1)}>
      {!liked ? (
        <FavoriteBorderIcon style={{ color: "grey" }} />
      ) : (
        <FavoriteIcon style={{ color: "red" }} />
      )}
      <span>13 likes</span>
    </ContainerLikes>
  );
};

const ContainerLikes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 13px;
  }
`;

export default LikeButton;
