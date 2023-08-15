import styled from 'styled-components'
import React from 'react';
import Post from '../components/Post';
import FormPost from '../components/FormPost';

export default function HomePage(){
    return (
        <Container>
            <Body>
                <TitleContainer>
                    <span>timeline</span>
                </TitleContainer>
                <FormPost />
                <Post 
                    name = {"Levylson Pereira"} 
                    text = {"Muito bacana meoo!"}
                    hashtag = {"#helloWorld"}
                />
                <Post 
                    name = {"Juvenal Juvêncio"} 
                    text = {"AAAAAAAAAAAAAAA"}
                    hashtag = {"#teste"}
                />
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