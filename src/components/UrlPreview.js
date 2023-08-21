import styled from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function UrlPreview(props) {

    function truncateDescription(description, maxLength) {
        if (description && description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    }

    return (
            <Link data-test="link" target="_blank" rel="noopener noreferrer" href={props.postUrl} style={{ textDecoration: 'none', textDecorationColor: "inherit" }}>
                <SCUrlPreview>
                    <Helmet>
                        <meta property="og:image:type" content="image/jpeg" />
                        <meta property="og:image:width" content="300" />
                        <meta property="og:image:height" content="200" />
                        <meta property="og:image:alt" content="A shiny red apple with a bite taken out" />
                        <meta property="og:title" content={props.title} />
                        <meta property="og:description" content={props.description} />
                        <meta property="og:image" content={props.metaImg} />
                        <meta property="og:url" content={props.postUrl} />
                    </Helmet>

                    <DivText>
                        <h1>{props.title}</h1>
                        <p>{truncateDescription(props.description, 200)}</p>
                    </DivText>

                    <SCImg src={props.metaImg} alt="Imagem do post" />
                
                </SCUrlPreview>
            </Link>
    );
}


const DivText = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    gap: 1em;
    margin-right: 1em;
    h1{
        color: white !important;
        font-size: 18px;
    }
    p{
        flex-wrap: wrap;
        font-weight: normal !important;
        color: #a3a3a3;
    }
`;

const SCImg = styled.img`
    height: 100%;
    width: 45%;
    position: absolute;
    right: 0;
    top: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const SCUrlPreview = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    /* width: 100%; */
    height: 10em;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    position: relative;
`;