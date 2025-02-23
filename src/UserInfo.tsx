import { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import { UserData } from "./types/User"

interface UserState {
  user: UserData | null;
}

type UserAction =
  | { type: "LOGIN"; payload: UserData | null }
  | { type: "LOGOUT" };

const UserInfo = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | undefined>(undefined);

const authReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
  }, []);

  return <UserInfo.Provider value={{ state, dispatch }}>{children}</UserInfo.Provider>;
};

export const useInfo = () => {
  const context = useContext(UserInfo);
  if (!context) {
    throw new Error("useAuth must be used within an UserProvider");
  }
  return context;
};
