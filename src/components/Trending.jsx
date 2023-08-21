import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";

export default function Trending() {

    const [hashtags, setHasgtags] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag`)
            .then((res) => { setHasgtags(res.data) })
            .catch((err) => { console.error(err) });
    }, [])

    return (
        <TrendingBox data-test="trending">
            <h3>trending</h3>
            <hr></hr>
            {hashtags.map((hashtag, index) => {
                return <Link key={index} to={`/hashtag/${hashtag.hashtagName}`} data-test="hashtag" >
                    <p># {hashtag.hashtagName}</p>
                </Link>
            })}
        </TrendingBox>
    )

}

const TrendingBox = styled.div`
    padding-bottom: 20px;
    width: 300px;
    background: #171717;
    padding-top: 8px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    color: white;
    h3 {
        padding-left: 15px;
        padding-bottom: 2px;
        font-family: Oswald;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
    }
    hr{
        width: 300px;
        color: #484848;
        margin-bottom: 10px;
    }
    p {
        padding-left: 15px;
        text-decoration: none;
        color: white;
        font-family: Lato;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
        margin-top: 8px;
    }
`;
