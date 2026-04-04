/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

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

  const hasJson = response.headers
    .get("content-type")
    ?.includes("application/json");
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
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        setUser(null);
      } else {
        await ensureUserProfile(data.user);
        setUser(data.user);
      }

      setAuthLoading(false);
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const ensureUserProfile = async (user) => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!data) {
      await supabase.from("users").insert({
        id: user.id,
        username: user.email.split("@")[0], // temp username
        xp: 0,
      });
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    await ensureUserProfile(data.user);

    setUser(data.user);
    return data.user;
  };

  const signup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    await ensureUserProfile(data.user);

    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) return new Error(error.message);
  };

  const fetchUsers = async (search = "") => {
    const data = await apiRequest(
      `/api/users?search=${encodeURIComponent(search)}`,
      {
        method: "GET",
      },
    );

    return data.users;
  };

  const fetchUserProfile = async (username) => {
    const data = await apiRequest(
      `/api/users/${encodeURIComponent(username)}`,
      {
        method: "GET",
      },
    );

    return data.user;
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
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) throw new Error("Not authenticated.");

    const { data: existing } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .eq("game", game)
      .single();

    let newScore = scoreDelta;

    console.log(existing);
    if (existing) {
      newScore = existing.score + scoreDelta;

      await supabase
        .from("scores")
        .update({ score: newScore })
        .eq("id", existing.id);
    } else {
      await supabase.from("scores").insert({
        user_id: user.id,
        game,
        score: scoreDelta,
      });
    }

    const xpGain = Math.max(1, Math.ceil(scoreDelta * 0.2));

    const { data: profile } = await supabase
      .from("users")
      .select("xp")
      .eq("id", user.id)
      .single();

    const newXp = (profile?.xp || 0) + xpGain;

    await supabase.from("users").update({ xp: newXp }).eq("id", user.id);
  };

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("xp", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  };

  const value = useMemo(
    () => ({
      user,
      authLoading,
      login,
      signup,
      logout,
      loginWithGoogle,
      addFriend,
      removeFriend,
      fetchUsers,
      fetchUserProfile,
      reportScore,
      fetchLeaderboard,
    }),
    [user, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
