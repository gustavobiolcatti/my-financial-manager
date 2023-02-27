import { createContext, ReactNode, useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

type User = {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
};

type AuthContextType = {
  user?: User | null;
  signInWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const provider = new GoogleAuthProvider();

const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const { user: userData } = await signInWithPopup(auth, provider);
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => useContext(AuthContext);
