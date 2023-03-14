import { createContext, ReactNode, useContext, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth } from 'services/firebase';

import { useToast } from 'hooks/useToast';

import { User } from 'models/user';

import usePostUser from 'requests/mutations/usePostUser';
import useListUser from 'requests/queries/useListUser';

type AuthContextType = {
  user: User | null;
  signed: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
};
type AuthProviderProps = {
  children: ReactNode;
};

const provider = new GoogleAuthProvider();

const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const { showToast } = useToast();

  onAuthStateChanged(auth, (data) => {
    if (!data || user) return;

    const userData = {
      id: data?.uid,
      name: data?.displayName,
      avatar: data?.photoURL,
      email: data?.email,
    };

    setUser(userData);
  });

  const hasUserInDatabase = async (user: User): Promise<void> => {
    const { data: filteredUser } = await useListUser({ id: user.id });

    if (!filteredUser) {
      await usePostUser(user);
    }
  };

  const signInWithGoogle = (): void => {
    signInWithPopup(auth, provider)
      .then((data) => {
        if (!data) return;

        console.log(data);

        const userData = {
          id: data.user.uid,
          name: data.user.displayName,
          avatar: data.user.photoURL,
          email: data.user.email,
        };

        hasUserInDatabase(userData);
        setUser(userData);

        showToast({ type: 'success', message: 'Login realizado' });
      })
      .catch((error) => {
        const err = error as Error;
        console.log('ERROR =>> ', err.message);
      });
  };

  const logout = (): void => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => {
        const err = error as Error;
        console.log('ERROR =>> ', err.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => useContext(AuthContext);
