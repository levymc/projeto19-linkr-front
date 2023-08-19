import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function useSignUp() {
  const navigate = useNavigate();

  return async (body) => {
    try {
      console.log(body);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sign-up`,
        body
      );
      console.log(response.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
      window.location.reload();
    }
  };
}

export function useLogout() {
  const { token, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  return async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, config);
      navigate("/");
      setToken(undefined);
      setUser(undefined);
      localStorage.clear();
      alert("logged out successfully ");
    } catch (err) {
      alert(err.response.data.message);
      window.location.reload();
    }
  };
}

export function useLogin() {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  return async (body) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sign-in`,
        body
      );
      console.log(response);
      setUser(response.data);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");
      console.log("Stored User:", storedUser);
      console.log("Stored Token:", storedToken);
      navigate("/timeline");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred. Please make sure the server is running and try again. 😊";
      alert(errorMessage);
      window.location.reload();
    }
  };
}
