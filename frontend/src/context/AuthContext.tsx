import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export type User = {
  _id: string;
  name: string;
  email: string;
  type?: string;
  streak?: number;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginToken: (token: string, user?: User) => void;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async (authToken: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.data && res.data.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth fetch failed:", err);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser(token);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const loginToken = (newToken: string, userData?: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (userData) {
      setUser(userData);
      setLoading(false);
    } else {
      fetchUser(newToken);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  const refetchUser = async () => {
    if (token) {
      await fetchUser(token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginToken, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
