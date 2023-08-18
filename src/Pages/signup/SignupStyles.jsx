import styled from "styled-components";

export const Main = styled.div`
  display: flex;
`;
export const SignupContainer = styled.div`
  background-color: var(--background-color);
  width: 30%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  @media (max-width: 768px) {
    height: calc(100vh - 185px);
    width: 100%;
    top: 174px;
  }
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  input {
    width: 395px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #fff;
    background-color: #fff;
    font-family: var(--secondary-font);
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 50px;
    color: #000;
    padding: 17px;
    @media (max-width: 768px) {
      width: 84%;
    }
    ::placeholder {
      font-family: var(--tertiary-font);
      font-style: normal;
      font-weight: 700;
      font-size: 27px;
      line-height: normal;
      color: #9f9f9f;
    }
    &:focus {
      border-color: var(--blue-color);
      outline: none;
    }
  }
  button {
    width: 430px;
    height: 70px;
    border-radius: 6px;
    font-family: var(--tertiary-font);
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    cursor: pointer;
    color: var(--white-color);
    border: 1px solid var(--blue-color);
    background-color: var(--blue-color);
    @media (max-width: 768px) {
      width: 91%;
    }
  }
  a {
    font-family: var(--secondary-font);
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
    @media (max-width: 768px) {
      margin-top: 25px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;
