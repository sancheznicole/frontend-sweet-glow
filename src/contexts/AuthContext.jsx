import { createContext, useContext, useState, useEffect } from "react";
import { getUserData } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {

    const loadUser = async () => {
      try {

        setLoadingUser(true)

        const stored = localStorage.getItem("user")

        if (stored) {
          await login(JSON.parse(stored))
        }

      } catch (error) {
        console.log(error?.message)
      } finally {
        setLoadingUser(false)
      }
    }

    loadUser()

  }, [])

  const login = async (data) => {
    localStorage.setItem("user", JSON.stringify(data));

    // sacar info del usuario para guardarla con el setUser
    const res = await getUserData(data?.access_token)

    if(res?.error){
      console.log(res?.error)
    }

    setUser(res?.user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        loadingUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};