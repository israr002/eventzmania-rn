import { createContext } from "react";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType>(null);

export { AuthContext };
