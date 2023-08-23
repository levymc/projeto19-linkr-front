import styled from "styled-components";

const HomeScreenContainer = styled.div`
  background-color: var(--foreground-color);
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  width: 70%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  @media (max-width: 768px) {
    width: 100%;
    height: 175px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 160px;
  margin-top: 300px;
  @media (max-width: 768px) {
    align-items: center;
    margin: 0px;
  }
  span {
    font-family: var(--primary-font);
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    letter-spacing: 0.05em;
    color: var(--white-color);
    @media (max-width: 768px) {
      font-size: 76px;
    }
  }
  p {
    font-family: var(--tertiary-font);
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    margin-top: 20px;
    color: var(--white-color);
    @media (max-width: 768px) {
      font-size: 23px;
      margin-top: 10px;
    }
  }
`;

export default function HomeScreen() {
  return (
    <HomeScreenContainer>
      <MainContent>
        <span>linkr</span>
        <p>
          save, share and discover <br />
          the best links on the web
        </p>
      </MainContent>
    </HomeScreenContainer>
  );
}
