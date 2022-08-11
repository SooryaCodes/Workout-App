import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AUTHCONTEXT : ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
