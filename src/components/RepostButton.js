import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoopIcon from '@mui/icons-material/Loop';

export default function RepostButton({ postId, respostAmount }) {

    const [reposted, setResposted] = useState(false);
    const [repostNumber, setRepostNumber] = useState(parseInt(respostAmount));

    const handleRepost = async () => {

        try {

            const storedToken = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${storedToken}` } };

            await axios.post(`${process.env.REACT_APP_API_URL}/repost/${postId}`, {}, config);

            if (!reposted) { setRepostNumber(repostNumber + 1) }
            else { setRepostNumber(repostNumber - 1) };
            setResposted(!reposted);

        } catch (err) {
            console.error('Erro ao repostar', err);
        }

    };

    return (

        <ContainerRespost onClick={() => handleRepost()}>
            <LoopIcon data-test="repost-btn" />
            <span data-test="repost-counter">{repostNumber} re-post</span>
        </ContainerRespost>

    );
};

const ContainerRespost = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
        font-size: 13px;
    }
`;