import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {
  Container,
  Title,
  UserImage,
  Icon,
  Menu,
  LogoutOption,
} from "./styled";
import { useContext, useState } from "react";
import { useLogout } from "../../services/auth";
import AuthContext from "../../context/AuthContext";
import SearchInput from "../SearchBar/SearchBar";

export default function Header() {
  const { user } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const logout = useLogout();

  const handleIconClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container>
      <Title>linkr</Title>
      <SearchInput />
      <Menu data-test="menu">
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
          <LogoutOption onClick={logout} data-test="menu">
            <h1>Logout</h1>
          </LogoutOption>
        )}
      </Menu>
    </Container>
  );
}
