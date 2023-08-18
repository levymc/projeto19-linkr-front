import { useState } from "react";
import AuthContext from "./context/AuthContext";

import Routes from "./routes/index.routes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
