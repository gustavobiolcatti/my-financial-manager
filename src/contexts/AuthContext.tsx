import { createContext, ReactNode, useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "services/firebase";

import { User } from "models/user";

import usePostUser from "requests/queries/usePostUser";
import useListUser from "requests/queries/useListUser";

type AuthContextType = {
  user?: User;
  signInWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const provider = new GoogleAuthProvider();

const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();

  const hasUserInDatabase = async (user: User): Promise<void> => {
    const { data: filteredUser } = await useListUser({ id: user.id });

    if (!filteredUser) {
      await usePostUser({ user });
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const { user: userData } = await signInWithPopup(auth, provider);

      if (userData) {
        const filteredUser = {
          id: userData.uid,
          name: userData.displayName,
          avatar: userData.photoURL,
          email: userData.email,
        };

        hasUserInDatabase(filteredUser);
        setUser(filteredUser);
      }
    } catch (error) {
      const err = error as Error;

      console.log("ERROR =>> ", err.message);
    }
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
