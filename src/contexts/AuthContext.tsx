"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import api from "@/services/api";

interface AuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  updateLoggedUser: (name: string, avatarUrl: string) => void;
}

interface User {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  avatar: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const { push } = useRouter();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, user: responseUser } = response.data;

      setCookie(undefined, "m3ctf.token", token);
      setCookie(undefined, "m3ctf.user", JSON.stringify(responseUser));

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser(responseUser);
      push("/");
    },
    [push]
  );

  const handleLogout = useCallback(() => {
    setUser(null);

    destroyCookie(undefined, "m3ctf.token");
    destroyCookie(undefined, "m3ctf.user");

    push("/login");
  }, [push]);

  const updateLoggedUser = useCallback(
    (name: string, avatarUrl: string) => {
      setUser((prevUser) => {
        setCookie(
          undefined,
          "m3ctf.user",
          JSON.stringify({ ...user, name, avatar: avatarUrl })
        );

        return { ...prevUser, name, avatar: avatarUrl };
      });
    },
    [user]
  );

  const loadStoragedData = async () => {
    const { "m3ctf.token": token, "m3ctf.user": storagedUser } = parseCookies();

    if (token && storagedUser) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      const storagedUserParsed = JSON.parse(storagedUser);

      setUser(storagedUserParsed);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStoragedData();
  }, []);

  const isAuthenticated = !!user;

  const authContext = useMemo(
    () => ({
      isAuthenticated,
      loading,
      user,
      handleLogin,
      handleLogout,
      updateLoggedUser,
    }),
    [
      handleLogin,
      handleLogout,
      loading,
      isAuthenticated,
      updateLoggedUser,
      user,
    ]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
