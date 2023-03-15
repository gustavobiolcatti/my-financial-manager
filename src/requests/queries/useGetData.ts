import { onValue, ref, DataSnapshot } from 'firebase/database';

import { useAuth } from 'contexts/AuthContext';

import { db } from 'services/firebase';

type UseGetDataReturn = {
  getData: (
    path: string,
    callback: (snapshot: DataSnapshot) => void,
    useFullPath?: boolean,
    onlyOnce?: boolean,
  ) => void;
};

const useGetData = (): UseGetDataReturn => {
  const { user } = useAuth();

  const getData = (
    path: string,
    callback: (snapshot: DataSnapshot) => void,
    useFullPath?: boolean,
    onlyOnce?: boolean,
  ): void => {
    const databaseRef = ref(
      db,
      useFullPath ? path : `users/${user?.id}/${path}`,
    );

    onValue(
      databaseRef,
      (snapshot) => {
        callback(snapshot);
      },
      {
        onlyOnce,
      },
    );
  };

  return { getData };
};

export default useGetData;
