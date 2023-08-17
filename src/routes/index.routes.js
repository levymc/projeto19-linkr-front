import { useRoutes } from "react-router-dom";
import HomePage from "../Pages/HomePage";

const Routes = () => {
  return useRoutes([{ path: "/", element: <HomePage /> }]);
};
export default Routes;
