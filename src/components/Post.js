import styled from 'styled-components'
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UrlPreview from './UrlPreview';

export default function Post(props) {
    return (
        <ContainerPost>
            <LeftSection>
                <PerfilImg src="https://yt3.googleusercontent.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" />
                <ContainerLikes>
                    <FavoriteBorderIcon />
                    <span>13 likes</span>
                </ContainerLikes>
            </LeftSection>
            <h2>{props.name}</h2>
            <p>{props.text} <b>{props.hashtag}</b></p>
            <UrlPreview 
                text={"testee"} 
            />  
        </ContainerPost>
    )
}



const ContainerLikes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    justify-content: center;
    align-items: center;
    span{ 
        font-size: 13px;
    }
`

const PerfilImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
`
const ContainerPost = styled.div`
    height: 17em;
    width: 100%;
    background-color: #171717;
    box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212); 
    border-radius: 10px;
    color: white;

    display: flex;
    flex-direction: column;
    padding: 2em;
    padding-left: 20%;
    position:relative;
`

const LeftSection = styled.section`
    position: absolute;
    left: 0;
    top: 0;
    background-color: #333333;
    width: 15%;
    height: 19em;
    padding-top: 2em;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2em;
`