import React, { useState } from "react";
import { client } from '../../Utils/httpClient';
import { error } from "console";

interface AuthContextType {
  authorized: boolean;
  setAuthorized: (value: boolean) => void;
  authenticate: (email: string, password: string) => Promise<void>;
  authorizate: (email: string, password1: string, password2: string, name: string) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({
  authorized: false,
  setAuthorized: () => {},
  authenticate: () => Promise.resolve(),
  authorizate: () => Promise.resolve()
})

type Props = {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  console.log(authorized)


  async function authenticate(email: string, password: string) {
    client.post('auth/login', { "email": email, "password": password })
      .then(() => {
        setAuthorized(true)
      })
    .catch((error) => {throw error})
  }

  async function authorizate(
    email: string,
    password1: string,
    password2: string,
    name: string
  ) {
    client.post('auth/login', {email, password1, password2, name })
    .then(() => {
      setAuthorized(true)
    })
  .catch((error) => {throw error})
  }

  return (
    <AuthContext.Provider value={{ authorized, authenticate, authorizate, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  )
}