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
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const logout = useLogout();

  const handleIconClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  return (
    <Container>
      <Title>linkr</Title>
      <SearchInput />
      <Menu>
        {showLogoutOption ? (
          <Icon onClick={handleIconClick}>
            <AiOutlineUp font-weight="700" fontSize="1.2em" />
          </Icon>
        ) : (
          <Icon onClick={handleIconClick}>
            <AiOutlineDown font-weight="700" fontSize="1.2em" />
          </Icon>
        )}

        <UserImage
          onClick={handleIconClick}
          data-test="avatar"
          src={user?.imageUrl || "default-image-url"}
          alt="User Image"
        />
        {showLogoutOption && (
          <LogoutOption onClick={logout} data-test="menu">
            <h1 data-test="menu">Logout</h1>
          </LogoutOption>
        )}
      </Menu>
    </Container>
  );
}
