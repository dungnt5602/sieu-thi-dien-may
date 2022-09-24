import Context from "@mui/base/TabsUnstyled/TabsContext";
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth]= useState({});

  return 
};
