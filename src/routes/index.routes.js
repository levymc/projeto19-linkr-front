import { useRoutes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Signin from "../Pages/signin/Signin";
import Signup from "../Pages/signup/Signup";
import UserMe from "../Pages/UserMe";

const Routes = () => {
  return useRoutes([
    { path: "/", element: <Signin /> },
    { path: "/sign-up", element: <Signup /> },
    { path: "/timeline", element: <HomePage /> },
    { path: "/user/:id", element: <UserMe /> },
  ]);
};
export default Routes;
