import styled from 'styled-components'
import React from 'react';
import Post from '../components/Post';


export default function HomePage(){
    return (
        <Container>
            <Body>
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

    padding: 4em;
    width: 50%;
    height: 60%;
	
`;