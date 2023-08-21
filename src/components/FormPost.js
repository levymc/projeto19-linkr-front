import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { simpleModal } from "./modais/modais.js";
// import ReactLoading from 'react-loading';
import sleep from "./util/sleep.js";
import { usePostsContext } from "./Context.js";

export default function FormPost(props) {
  const { postsInfos, setPostsInfos, newPost, setNewPost } = usePostsContext();
  const [postUrl, setPostUrl] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [loading, setLoading] = useState(false);
  const storedToken = localStorage.getItem("token");

  const handleSubtmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${storedToken}` } };
    // await sleep(20)
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/newPost`,
        {
          postUrl: postUrl,
          content: contentValue,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        setNewPost(res.data);
        simpleModal("Postagem enviada com sucesso!", "success");
        setPostUrl("");
        setContentValue("");
      })
      .catch((err) => {
        console.error(err);
        simpleModal("Houve um erro ao publicar seu link", "error");
      })
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };

    return (
        <SCFormPost data-test="publish-box" onSubmit={handleSubtmit}>
            <LeftSection>
                <PerfilImg src="https://yt3.googleusercontent.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" />
            </LeftSection>
            <span>What are you going to share today?</span>
            <ContainerUrl>
                <input
                    placeholder='https://'
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    type="url"
                    data-test="link"
                    required
                />
            </ContainerUrl>
            <ContainerContent>
                <StyledInput
                    placeholder='Awesome article about #javascript'
                    value={contentValue}
                    data-test="description"
                    onChange={(e) => setContentValue(e.target.value)}
                    type="text"
                />
            </ContainerContent>
            <ContainerBtn>
                <Btn type="submit" backGround={loading ? "grey" : "#1877F2"} data-test="publish-btn" disabled={loading}>
                    {loading 
                        ? "Publishing..."
                        : "Publish"
                    }
                    
                </Btn>
            </ContainerBtn>
        </SCFormPost>
    );
  return (
    <SCFormPost data-test="publish-box" onSubmit={handleSubtmit}>
      <LeftSection>
        <PerfilImg src="https://yt3.googleusercontent.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" />
      </LeftSection>
      <span>What are you going to share today?</span>
      <ContainerUrl>
        <input 
          placeholder="https://"
          data-test="link"
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
          type="url"
          required
        />
      </ContainerUrl>
      <ContainerContent>
        <StyledInput data-test="description"
          placeholder="Awesome article about #javascript"
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          type="text"
        />
      </ContainerContent>
      <ContainerBtn data-test="publish-btn">
        <Btn
          type="submit"
          backGround={loading ? "grey" : "#1877F2"}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </Btn>
      </ContainerBtn>
    </SCFormPost>
  );
}

const ContainerBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 33px;
`;

// const StyledLoading = styled(ReactLoading)`
//     position: absolute;
//     top: -28px;
//     right: 12px;
//     z-index: 999;
// `

const Btn = styled.button`
  width: 112px;
  height: 33px;
  border-radius: 5px;
  border: 0;
  background: ${(props) => props.backGround};
  margin-right: 2em;

  color: #fff;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  position: relative;
`;

const StyledInput = styled.input`
  display: flex;
  align-items: start !important;
  justify-content: start !important;

  height: 5em;
  width: 100%;
  background-color: #efefef;
  border: 0;
  border-radius: 10px;
  padding: 0.25em;
  padding-left: 1em;
  font-family: Lato;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  &::placeholder {
    position: absolute;
    top: 1em;
    left: 1em;
    color: #707070;
  }
`;

const ContainerContent = styled.div`
  padding-right: 3em;
`;

const ContainerUrl = styled.div`
  padding-right: 3em;
  input {
    height: 30px;
    width: 100%;
    background-color: #efefef;
    border: 0;
    border-radius: 10px;
    padding: 0.25em;
    padding-left: 1em;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

const SCFormPost = styled.form`
  height: 12em;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212);
  border-radius: 20px;
  color: #707070;

  display: flex;
  flex-direction: column;
  padding-top: 2em;
  padding-bottom: 6em;
  padding-left: 20%;
  position: relative;
  gap: 1em;
  span {
    font-family: Lato;
    font-size: 30px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

const LeftSection = styled.section`
  position: absolute;
  left: 0;
  top: 0;
  width: 15%;
  height: 100%;
  padding-top: 2em;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2em;
`;

const PerfilImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
`;
