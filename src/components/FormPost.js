import styled from 'styled-components'
import React, { useState } from 'react';

export default function FormPost(props) {
    const [urlValue, setUrlValue] = useState('')
    const [contentValue, setContentValue] = useState('')

    const handleSubtmit = (e) => {
        e.preventDefault()
        console.log('URL:', urlValue)
        console.log('Content:', contentValue)
    }

    return (
        <SCFormPost onSubmit={handleSubtmit}>
            <LeftSection>
                <PerfilImg src="https://yt3.googleusercontent.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" />
            </LeftSection>
            <span>What are you going to share today?</span>
            <ContainerUrl>
                <input
                    placeholder='https://'
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                />
            </ContainerUrl>
            <ContainerContent>
                <StyledInput
                    placeholder='Awesome article about #javascript'
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                />
            </ContainerContent>
            <Btn type="submit">Publish</Btn>
        </SCFormPost>
    );
}

const Btn = styled.button`
    position: absolute;
    bottom: 3em;
    right: 2em;
    width: 112px;
    height: 33px;
    border-radius: 5px;
    border: 0;
    background: #1877F2;

    color: #FFF;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
`

const StyledInput = styled.input`
    height: 5em;
    width: 100%;
    background-color: #EFEFEF;
    border: 0;
    border-radius: 10px;
    padding: 0.25em;
    padding-left: 1em;
    font-family: Lato;
    font-size: 18px;
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
    input{
        height: 30px;
        width: 100%;
        background-color: #EFEFEF;
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
`

const SCFormPost = styled.form`
    height: 12em;
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212); 
    border-radius: 20px;
    color: #707070;

    display: flex;
    flex-direction: column;
    padding-top: 2em;
    padding-bottom: 6em;
    padding-left: 20%;
    position:relative;
    gap: 1em;
    span{
        font-family: Lato;
        font-size: 30px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
    }
`

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
`

const PerfilImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
`