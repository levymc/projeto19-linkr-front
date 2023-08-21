import styled from "styled-components";
import React, { useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";
import ReactLoading from "react-loading";
import { usePostsContext } from "../components/Context";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import { simpleModal } from "../components/modais/modais";
import Trending from "../components/Trending";

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
    }, [postsInfos]);

    return (
        <Container>
            <Header />
            {postsInfos.posts ? (
                <BodyContent>
                    <BodyContentLeft>
                        <TitleContainer>
                            <h2 data-test="hashtag-title"># {hashtag}</h2>
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
  font-family: "Oswald", sans-serif;
  font-size: 43px;
  font-weight: 700;
  display: flex;
  width: 100%;
  align-items: start;
  padding-bottom: 0.6em;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: #333333;
  overflow-y: hidden;
`;

const BodyContent = styled.div`
  display: flex;
  .trending-div {
    margin-top: 130px;
  }
`;

const BodyContentLeft = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;
  height: 60%;
  padding: 2em;
  max-width: 760px;
`;