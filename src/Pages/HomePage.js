import styled from 'styled-components'
import React from 'react';
import Post from '../components/Post';


export default function HomePage(){
    return (
        <Container>
            <Body>
                <Post text={"Oia"} />
            </Body>
        </Container>
    )
}



const Container = styled.div`
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