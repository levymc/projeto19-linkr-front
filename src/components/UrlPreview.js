import styled from 'styled-components'
import React from 'react';


export default function UrlPreview(props){
    return (
        <SCUrlPreview>
            {props.text}
            <SCImg src="https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png"></SCImg>
        </SCUrlPreview>
    )
}

const SCImg = styled.img`
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`

const SCUrlPreview = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    /* width: 100%; */
    height: 10em;
    padding: 2em;

    position: relative;

`