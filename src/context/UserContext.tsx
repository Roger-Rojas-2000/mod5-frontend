import { createContext, useState, useContext } from "react";
import { JwtPayload } from "jwt-decode";
//import { useNavigate } from "react-router";
import React from "react";

interface AuthContextType {
  user: string | null; // o un tipo definido, si lo tenés
  setUser: React.Dispatch<React.SetStateAction<null>>;
  token: JwtPayload | null; // o string | null si preferís
  setToken: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<JwtPayload | null>(null);
  //const navigate = useNavigate();

  /*useEffect(() => {
    const token = localStorage.getItem("token_jwt");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      // validación de expiración...
      const now = Date.now() / 1000;
      if (!decoded.exp || decoded.exp < now) {
        localStorage.removeItem("token_jwt");
        navigate("/login");
        return;
      }
      console.log("payload", decoded);
      setToken(decoded);
    } catch {
      localStorage.removeItem("token_jwt");
      navigate("/login");
    }
  }, []); */

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de AuthProvider");
  }
  return context;
}

export { useUserContext, AuthProvider };
