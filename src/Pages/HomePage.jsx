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
import sleep from "../components/util/sleep";
import { simpleModal } from "../components/modais/modais";
import Trending from "../components/Trending";

export default function HomePage() {
  const navigate = useNavigate();
  const { postsInfos, setPostsInfos, newPost, setNewPost } = usePostsContext();
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("token")
  const config = { headers: { Authorization: `Bearer ${storedToken}` } };

  useEffect(() => {
    axios.get("http://localhost:5000/posts", config).then((response) => {
      setPostsInfos(response.data);
      console.log(response.data)
    })
      .catch((error) => {
        console.error("Erro ao obter os postInfo:", error);
        simpleModal("Erro ao obter os postInfo: " + error, "error")
      })

  }, [newPost]);

  return (
    <Container>
      <Header />
      {postsInfos.posts ? (
        <BodyContent>
          <BodyContentLeft>
            <TitleContainer>
              <span onClick={() => console.log(postsInfos)}>timeline</span>
            </TitleContainer>
            <FormPost />
            {postsInfos.posts && postsInfos.posts.map((post, i) => {
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
                />
              )
            })}
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