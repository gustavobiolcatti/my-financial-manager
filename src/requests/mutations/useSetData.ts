import { ref, set } from 'firebase/database';

import { useAuth } from 'contexts/AuthContext';

import { db } from 'services/firebase';

type UseGetDataReturn = {
  setData: (
    path: string,
    values: Record<string, unknown> | null,
    useFullPath?: boolean,
  ) => void;
};

const useSetData = (): UseGetDataReturn => {
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

    set(databaseRef, values).catch((error) => {
      const err = error as Error;
      console.log('ERROR =>> ', err.message);
    });
  };

  return { setData };
};

export default useSetData;
