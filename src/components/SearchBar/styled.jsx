import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: relative;
  background: rgb(255, 255, 255);
  width: 32%;
  min-height: 45px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 10px;
  margin-left: 168px;
  z-index: 2;

  @media (max-width: 650px) {
    position: absolute;
    left: 50%;
    top: 80px;
    width: 94%;
    transform: translate(-50%, -50%);
    margin: 43px 0 0 0;
  }
  @media (max-width: 480px) {
    position: absolute;
    left: 47.77%;
    top: 80px;
    width: 89%;
    transform: translate(-50%, -50%);
    margin-top: 43px;
  }
`;

export const UserLink = styled(Link)`
  text-decoration: none;
  color: #707070;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    object-fit: cover;
    width: 39px;
    height: 39px;
    margin-right: 15px;
  }

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-right: 10px;
  }

  .follow-btn {
    display: flex;
    align-items: center;
  }
`;

export const InputBox = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

export const SearchContainer = styled.div`
  width: 32%;
  max-height: 310px;
  align-items: center;
  background: #e7e7e7;
  border-radius: 8px;
  overflow-y: scroll;
  position: absolute;
  top: 93%;
  left: 0;
  width: 100%;

  h1 {
    cursor: pointer;
    color: #515151;
    font-size: 19px;
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  @media (max-width: 650px) {
    top: 42px;
    width: 100%;
    max-height: 125px;
  }
  @media (max-width: 480px) {
    max-height: 82px;

    left: 50.04%;
    top: 82px;
    width: 100%;
    transform: translate(-50%, -50%);
  }
  button {
    color: #c5c5c5;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    opacity: 0.5;
    margin-left: 5px;
  }
  a {
    text-decoration: none;
  }
  h2 {
    cursor: text;
  }
  .follow-btn {
    display: flex;
    color: #c5c5c5;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    opacity: 0.5;
    margin-left: 5px;
  }
`;

export const UserBox = styled.a`
  width: 100%;
  height: 70px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 5px;
  color: black;
  padding: 2%;
  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  text-decoration: none;

  img {
    border-radius: 50%;
    object-fit: cover;
    width: 39px;
    height: 39px;
    margin-right: 15px;
  }
  span {
    color: #c5c5c5;
  }
`;

export const OutlineIcon = styled.span`
  margin: 15px;
  color: gray;
  ion-icon {
    font-size: 1.5em;
    color: #c6c6c6;
  }
`;

export const DebouncedInput = styled.input`
  width: 100%;
  height: 80%;
  margin: 2%;
  border: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  outline: none;
  @media (max-width: 375px) {
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }
`;
