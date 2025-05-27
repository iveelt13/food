"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
  loading: Boolean;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  signin: (_email: string, _password: string) => Promise<void>;
  signout: () => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [loading, setLoading] = useState(true);

  const signin = async (email: string, password: string) => {
    const data = await handleSignIn({ email, password });
    if (data?.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      push("/");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const data = await getCurrentUser(token);
      setUser(data?.user);
      setLoading(false);
    };
    loadUser();
  });

  const signout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, signin, signout, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
