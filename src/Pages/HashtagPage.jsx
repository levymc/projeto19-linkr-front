import styled from "styled-components";
import React, { useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";
import ReactLoading from "react-loading";
import { usePostsContext } from "../components/Context";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import { simpleModal } from "../components/modais/modais";

export default function HashtagPage() {

    const { hashtag } = useParams();

    const { postsInfos, setPostsInfos } = usePostsContext();
    const storedToken = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${storedToken}` } };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`, config)
            .then((response) => {
                setPostsInfos({ posts: response.data });
            })
            .catch((error) => {
                console.error("Erro ao obter os postInfo:", error);
                simpleModal("Erro ao obter os postInfo: " + error, "error")
            })
    }, []);

    return (
        <Container>
            <Header />
            <Body>
                {postsInfos.posts ? (
                    <>
                        <TitleContainer>
                            <span onClick={() => console.log(postsInfos)}>#{hashtag}</span>
                        </TitleContainer>
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
                    </>
                ) : (
                    <ReactLoading type={"spin"} color={"white"} height={667} width={375} />
                )}
            </Body>
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

const Body = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;

  padding: 2em;
  width: 50%;
  height: 60%;
`;
