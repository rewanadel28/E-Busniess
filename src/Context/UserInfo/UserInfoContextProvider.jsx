// UserInfoContextProvider.jsx
import { createContext, useState, useEffect } from "react";

export const UserInfoContext = createContext();

const UserInfoContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // حالة التحميل

  const addToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <UserInfoContext.Provider value={{ token, addToken, removeToken }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;
