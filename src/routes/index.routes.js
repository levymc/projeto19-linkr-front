import { useRoutes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Signin from "../Pages/signin/Signin";
import Signup from "../Pages/signup/Signup";
import { EditPost } from "./components/editField/editField";

const Routes = () => {
  return useRoutes([
    { path: "/", element: <Signin /> },
    { path: "/sign-up", element: <Signup /> },
    { path: "/timeline", element: <HomePage /> },
    { path: "/editPost", element: <EditPost /> },
  ]);
};
export default Routes;
