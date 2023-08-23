import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {
  Container,
  Title,
  UserImage,
  Icon,
  Menu,
  LogoutOption,
  StyledLink,
} from "./styled";
import { useContext, useState, useEffect, useRef } from "react";
import { useLogout } from "../../services/auth";
import AuthContext from "../../context/AuthContext";
import SearchInput from "../SearchBar/SearchBar";

export default function Header() {
  const { user } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const logout = useLogout();

  const menuRef = useRef(null);

  const handleIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Container>
      <StyledLink to="/timeline">
        <Title>linkr</Title>
      </StyledLink>
      <SearchInput />
      <Menu data-test="menu" ref={menuRef}>
        <Icon onClick={handleIconClick}>
          {showMenu ? (
            <AiOutlineUp fontWeight="700" fontSize="1.2em" />
          ) : (
            <AiOutlineDown fontWeight="700" fontSize="1.2em" />
          )}
        </Icon>

        <UserImage
          onClick={handleIconClick}
          data-test="avatar"
          src={user?.imageUrl || "default-image-url"}
          alt="User Image"
        />
        {showMenu && (
          <LogoutOption onClick={logout} data-test="logout">
            <h1>Logout</h1>
          </LogoutOption>
        )}
      </Menu>
    </Container>
  );
}
