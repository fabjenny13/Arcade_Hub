import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "arcadeHub.users";
const CURRENT_USER_KEY = "arcadeHub.currentUser";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(CURRENT_USER_KEY)),
  );

  const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const login = (username, password) => {
    const users = getUsers();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!foundUser) return false;

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    setUser(foundUser);
    return true;
  };

  const signup = (username, password) => {
    const users = getUsers();

    if (users.some((u) => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = { username, password };
    users.push(newUser);

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
