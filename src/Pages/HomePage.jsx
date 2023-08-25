import styled from "styled-components";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Post from "../components/Post";
import FormPost from "../components/FormPost";
import ReactLoading from "react-loading";
import { usePostsContext } from "../components/Context";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header/Header";
import Trending from "../components/Trending";
import useInterval from "use-interval";

export default function HomePage() {
  const navigate = useNavigate();
  const { postsInfos, setPostsInfos, newPost, setNewPost } = usePostsContext();
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
    userId: user.id,
  };
  const [cont, setCont] = useState(0);

  const handleBtnNewPosts = () => {
    getPosts(1);
  };

  const getPosts = (mode) => {
    const url = `${process.env.REACT_APP_API_URL}/get-following/${user.id}`;

    axios
      .get(url, config)
      .then((response) => {
        if (mode === 1) {
          setPostsInfos(response.data);
        }
      })
      .catch((error) => {
        console.error("Error getting posts:", error);
      });
  };

  useEffect(() => {
    getPosts(1);
  }, [cont]);

  useInterval(() => {
    getPosts(0);
  }, 15000);

  return (
    <Container>
      <Header />
      {postsInfos.posts ? (
        <BodyContent>
          <BodyContentLeft>
            <TitleContainer>
              <span>timeline</span>
            </TitleContainer>
            <FormPost cont={cont} setCont={setCont} />
            {postsInfos.posts.length > 0 ? (
              postsInfos.posts.map((post, i) => {
                return (
                  <Post
                    key={i}
                    name={post.name}
                    text={post.content}
                    description={post.descriptionMetadata}
                    title={post.titleMetadata}
                    hashtag={post.hashtags}
                    metaImg={post.imgMetadata}
                    userImg={post.imageUrl}
                    postUrl={post.postUrl}
                    postId={post.postId}
                    userId={post.userId}
                    cont={cont}
                    setCont={setCont}
                  />
                );
              })
            ) : (
              <span data-test="message">There are no posts yet</span>
            )}
            <BtnNewPosts onClick={handleBtnNewPosts}>
              Load New Posts
            </BtnNewPosts>
          </BodyContentLeft>
          <div className="trending-div">
            <Trending />
          </div>
        </BodyContent>
      ) : (
        <ReactLoading type={"spin"} color={"white"} height={667} width={375} />
      )}
    </Container>
  );
}

const Sentinela = styled.div`
  padding-top: 1em;
  height: 4em;
  width: 100%;
  color: #6d6d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
`;

const BtnNewPosts = styled.button`
  margin-top: 1.5em;
  height: 4em;
  width: 100%;
  border-radius: 1em;
  background: #1877f2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: #fff;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
`;

const TitleContainer = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 43px;
  font-weight: 700;
  display: flex;
  width: 100%;
  align-items: start;
  padding-bottom: 0.6em;
`;

const Container = styled.div`
  padding-top: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: #333333;
  /* padding-bottom: 5vh; */
  overflow-y: hidden;
`;

const BodyContent = styled.div`
  display: flex;
  .trending-div {
    margin-top: 130px;
  }
`;

const BodyContentLeft = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;
  height: 60%;
  padding: 2em;
  max-width: 760px;
`;
