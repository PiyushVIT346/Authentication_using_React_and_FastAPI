import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("awesomeLeadsToken"));

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return; // Don't fetch if there's no token

      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        // Token is valid, keep it
        localStorage.setItem("awesomeLeadsToken", token);
      } catch (err) {
        console.warn("Invalid token, clearing...");
        setToken(null);
        localStorage.removeItem("awesomeLeadsToken");
      }
    };

    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
