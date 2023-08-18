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
      <Menu>
        {showLogoutOption ? (
          <Icon onClick={handleIconClick}>
            <AiOutlineUp />
          </Icon>
        ) : (
          <Icon onClick={handleIconClick}>
            <AiOutlineDown />
          </Icon>
        )}

        <UserImage
          onClick={handleIconClick}
          data-test="avatar"
          src={user.imageUrl}
          alt="User Image"
        />
        {showLogoutOption && (
          <LogoutOption data-test="menu">
            <div data-test="logout" onClick={logout}>
              Logout
            </div>
          </LogoutOption>
        )}
      </Menu>
    </Container>
  );
}
