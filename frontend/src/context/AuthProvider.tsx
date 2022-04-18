import React, { createContext, useState, useEffect } from "react";
import { refreshUser } from "api/userApi";

interface IAuth {
  accessToken?: string;
  email?: string;
}

interface IAuthContext {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const fetchAccessToken = async () => {
      const { data } = await refreshUser();
      if (data.result) {
        setAuth({ email: data.data.email, accessToken: data.data.accessToken });
      }
    };
    fetchAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};