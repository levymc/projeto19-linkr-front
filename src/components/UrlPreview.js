import styled from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function UrlPreview(props) {
    const title = "Título do Seu Post"; // Substitua com a lógica para obter o título
    const imageUrl = "https://trecobox.com.br/wp-content/uploads/2022/06/Monkey-D-Luffy-One-Piece-Imagem-2.jpg.webp"; // Substitua com a lógica para obter a URL da imagem
    const postUrl = "https://dev.to/yulioaj290/link-previews-in-reactjs-for-social-networks-using-nextjs-4hd9"; // Substitua com a lógica para obter a URL do post

    return (
        <SCUrlPreview>
            <Helmet>
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="400" />
                <meta property="og:image:height" content="300" />
                <meta property="og:image:alt" content="A shiny red apple with a bite taken out" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={props.text} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={postUrl} />
            </Helmet>
            <h1>{title}</h1>
            <p>{props.text}</p>
            <SCImg src={imageUrl} alt="Imagem do post" />
            <a target="_blank" rel="noopener noreferrer" href={postUrl}>
                Ver post completo
            </a>
        </SCUrlPreview>
    );
}

const SCImg = styled.img`
    height: 100%;
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
