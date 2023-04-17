import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const prevToken = localStorage.getItem("key");
  const [token, setToken] = useState(prevToken);
  const isLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("key", token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("key");
    setToken(null);
  };

  const authContext = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
