import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import FormPost from '../components/FormPost';
import ReactLoading from 'react-loading';
import { usePostsContext } from '../components/Context';

export default function HomePage() {
    const { postsInfos, setPostsInfos, newPost, setNewPost } = usePostsContext()

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPostsInfos(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter os postInfo:", error);
            });
    }, [newPost]);


    return (
        <Container>
            <Body>
                {postsInfos
                    ? <>
                        <TitleContainer>
                        <span onClick={() => console.log(postsInfos)}>timeline</span>
                        </TitleContainer>
                        <FormPost />
                        {postsInfos.posts && postsInfos.posts.map((post, i) => {
                            return (
                                <Post 
                                    key = {i}
                                    name = {"Juvenciuus"}
                                    text = {post.content}
                                    hashtag = {"#TESTE"}
                                />
                            )
                        })}
                    </>
                    : <ReactLoading type={"spin"} color={"blue"} height={667} width={375} />
                }
                
            </Body>
        </Container>
    )
}

const TitleContainer = styled.div`
    color: #FFF;
    font-family: Ubuntu, sans-serif;
    font-size: 43px;
    font-weight: 700;
    display: flex;
    width: 100%;
    align-items: start ;
    padding-bottom: 0.6em;
`

const Container = styled.div`
    padding-top: 10em;
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