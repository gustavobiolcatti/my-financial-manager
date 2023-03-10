import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth } from 'services/firebase';

import { User } from 'models/user';

import usePostUser from 'requests/queries/usePostUser';
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

  const navigate = useNavigate();

  onAuthStateChanged(auth, (data) => {
    if (!data || user) return;

    const userData = {
      id: data?.uid,
      name: data?.displayName,
      avatar: data?.photoURL,
      email: data?.email,
    };

    setUser(userData);
    navigate('/dashboard');
  });

  const hasUserInDatabase = async (user: User): Promise<void> => {
    const { data: filteredUser } = await useListUser({ id: user.id });

    if (!filteredUser) {
      await usePostUser({ user });
    }
  };

  const signInWithGoogle = (): void => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const credential = GoogleAuthProvider.credentialFromResult(data);
        const token = credential?.accessToken;

        if (!data) return;

        const userData = {
          id: data.user.uid,
          name: data.user.displayName,
          avatar: data.user.photoURL,
          email: data.user.email,
        };

        hasUserInDatabase(userData);
        setUser(userData);
      })
      .catch((error) => {
        const err = error as Error;
        console.log('ERROR =>> ', err.message);
      });
  };

  const logout = () => {
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
