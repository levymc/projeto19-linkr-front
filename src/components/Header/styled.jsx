import styled from "styled-components";

export const Container = styled.div`
  background-color: #151515;
  font-size: 20px;
  width: 100%;
  height: 7.031vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;

  @media screen and (max-width: 480px) {
    height: 8vh;
    width: 100vw;
    padding: 0 10px;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7vw;
  padding-right: 30px;

  @media screen and (max-width: 480px) {
    width: 20vw;
  }
`;

export const Title = styled.h1`
  color: white;
  font-family: "Passion One";
  font-size: 40px;
  padding-left: 30px;
  margin-right: -150px;

  @media screen and (max-width: 480px) {
    font-size: 30px;
    padding-left: 10px;
  }
`;

export const Icon = styled.div`
  color: white;
  cursor: pointer;
`;

export const UserImage = styled.img`
  width: 3.681vw;
  height: 3.681vw;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;

  @media screen and (max-width: 480px) {
    width: 6vh;
    height: 6vh;
  }
`;
export const LogoutOption = styled.div`
  width: 150px;
  height: 47px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 100%;
  right: 0;
  margin-bottom: 5px; /* Adjust this value if needed */
  background-color: #151515;
  border-radius: 0 0 0 20px;
  transition: background-color 0.3s, color 0.3s;

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Lato";
  font-size: 18px;
  font-weight: 700;
  border: solid 1px black;
`;
