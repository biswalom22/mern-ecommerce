import React, { createContext, useState, useContext } from "react";

interface AuthState {
  token: string | null;
  user: {
    userId: string;
    email: string;
    role: string;
  } | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (token: string, user: any) => void; // Function to log in
  logout: () => void; // Function to log out
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state with values from localStorage or default to null
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null") || null,
  });

  // Login function
  const login = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthState({ token, user });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
