import React, { useState } from "react";

interface AuthContextType {
  authorized: boolean;
  setAuthorized: (value: boolean) => void;
  logIn: () => void;
  logOut: () => void;
  setToken: (token: string) => void
}

export const AuthContext = React.createContext<AuthContextType>({
  authorized: false,
  setAuthorized: () => { },
  logIn: () => { },
  logOut: () => { },
  setToken: () => { },

})

type Props = {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [authorized, setAuthorized] = useState(() => {
    return localStorage.getItem("isAuthorized") === "true";
  });

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  }

  const logIn = () => {
    setAuthorized(true);
    localStorage.setItem("isAuthorized", "true");
  };

  const logOut = () => {
    setAuthorized(false);
    localStorage.removeItem("isAuthorized");
    // localStorage.removeItem("password");
    // localStorage.removeItem("email");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{
      authorized,
      setAuthorized,
      logIn,
      logOut,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  )
}