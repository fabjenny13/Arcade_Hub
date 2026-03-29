/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const hasJson = response.headers.get("content-type")?.includes("application/json");
  const payload = hasJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const data = await apiRequest("/api/auth/me", { method: "GET" });
        if (isMounted) {
          setUser(data.user);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (username, password) => {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    setUser(data.user);
    return data.user;
  };

  const signup = async (username, password) => {
    const data = await apiRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await apiRequest("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const fetchUsers = async (search = "") => {
    const data = await apiRequest(`/api/users?search=${encodeURIComponent(search)}`, {
      method: "GET",
    });

    return data.users;
  };

  const addFriend = async (friendUsername) => {
    const data = await apiRequest("/api/friends", {
      method: "POST",
      body: JSON.stringify({ friendUsername }),
    });

    setUser(data.user);
    return data.user;
  };

  const removeFriend = async (friendUsername) => {
    const data = await apiRequest("/api/friends", {
      method: "DELETE",
      body: JSON.stringify({ friendUsername }),
    });

    setUser(data.user);
    return data.user;
  };

  const reportScore = async (game, scoreDelta) => {
    const data = await apiRequest("/api/scores", {
      method: "POST",
      body: JSON.stringify({ game, scoreDelta }),
    });

    setUser(data.user);
    return data;
  };

  const value = useMemo(
    () => ({
      user,
      authLoading,
      login,
      signup,
      logout,
      addFriend,
      removeFriend,
      fetchUsers,
      reportScore,
    }),
    [user, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
