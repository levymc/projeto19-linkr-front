import styled from "styled-components";
import React, { useEffect, useState, useContext, useRef } from "react";
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
import useInterval from "use-interval";
import InfiniteScroll from 'react-infinite-scroller';


export default function HomePage() {
  const navigate = useNavigate();
  const { postsInfos, setPostsInfos, newPost, setNewPost } = usePostsContext();
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${storedToken}` } };
  const [cont, setCont] = useState(0);
  const [amountNewPosts, setAmountNewPosts] = useState(0)
  const [newLimit, setNewLimit] = useState(() => {
    const storedLimit = sessionStorage.getItem("newLimit");
    return storedLimit ? parseInt(storedLimit) : 10;
  });

  const handleBtnNewPosts = () => {
    getPosts(1)
    setAmountNewPosts(0)
  }

  const getPosts = (mode, limit = newLimit) => {
    let url = `${process.env.REACT_APP_API_URL}/posts`;
  
    if (limit !== null) {
      url += `?limit=${limit}`;
    }
  
    axios
      .get(url, config)
      .then((response) => {
        if (mode === 1) {
          setPostsInfos(response.data);
        } else {
          const numberOfNewPosts = response.data.posts[0].postId - postsInfos.posts[0].postId;
          setAmountNewPosts(numberOfNewPosts);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter os postInfo:", error);
        simpleModal("Erro ao obter os postInfo: " + error, "error");
      });
  };
  useEffect(() => {
    getPosts(1)
  }, [cont]);

  useEffect(() => {
    sessionStorage.setItem("newLimit", newLimit.toString());
    getPosts(1, newLimit)
  }, [newLimit]);

  useEffect(() => { 
    if (document.getElementById("sentinela")) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if(entries.some((entry) => entry.isIntersecting)){
          console.log("Scrollou!")
          setNewLimit((prevLimit) => prevLimit + 10)
        }
      });
      intersectionObserver.observe(document.getElementById("sentinela"));
      return () => intersectionObserver.disconnect();
    }
  }, [newLimit,])
  

  useInterval(() => {
    getPosts(0);
  }, 15000);

  
  return (
    <Container>
      <Header/>
      {postsInfos.posts ? (
        <BodyContent>
          <BodyContentLeft>
            <TitleContainer>
              <span>timeline</span>
            </TitleContainer>
            <FormPost cont={cont} setCont={setCont} />
            {amountNewPosts > 0 && <BtnNewPosts onClick={handleBtnNewPosts}>Existem {amountNewPosts} posts novos</BtnNewPosts> }
              {postsInfos.posts.length > 0 ?
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
                }) : <span data-test="message">There are no posts yet</span>}
            <Sentinela id="sentinela">{postsInfos.posts.length === newLimit 
                                      ? <>Loading more posts <ReactLoading type={"spin"} color={"#6D6D6D"} height={150} width={70} /></>
                                      : "There are no more posts to load"}</Sentinela>
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
  color: #6D6D6D;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
`

const BtnNewPosts = styled.button`
  margin-top: 1.5em;
  height: 4em;
  width: 100%;
  border-radius: 1em;
  background: #1877F2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: #FFF;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
`

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
