import { useLocalStorage } from "../../hooks/useLocalStorage";
import React from "react";

const AuthContext = React.createContext([null, () => {}]);

/**
 * creates context and returns a context provider to store the values from useLocalStorage 
 * @param {Object} props  
 */
export function AuthProvider(props) {
  const [auth, setAuth] = useLocalStorage("auth", null);
  return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
