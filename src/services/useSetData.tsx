import { useAuth } from 'contexts/AuthContext';
import { ref, set } from 'firebase/database';

import { db } from 'services/firebase';
type UseGetDataReturn = {
  setData: (
    path: string,
    values: Record<string, unknown> | null,
    useFullPath?: boolean,
  ) => void;
};

export const useSetData = (): UseGetDataReturn => {
  const { user } = useAuth();

  const setData = (
    path: string,
    values: Record<string, unknown> | null,
    useFullPath?: boolean,
  ): void => {
    const databaseRef = ref(
      db,
      useFullPath ? path : `users/${user?.id}/${path}`,
    );
    set(databaseRef, values).catch((err) => {
      const error = err as Error;
    });
  };

  return { setData };
};
