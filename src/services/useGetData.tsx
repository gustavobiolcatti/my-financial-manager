import { DataSnapshot, onValue, ref } from "firebase/database";
import { useAuth } from "contexts/AuthContext";

import { db } from "services/firebase";

type UseGetDataReturn = {
  getData: (
    path: string,
    callback: (snapshot: DataSnapshot) => void,
    useFullPath?: boolean,
    onlyOnce?: boolean
  ) => void;
};

export const useGetData = (): UseGetDataReturn => {
  const { user } = useAuth();

  const getData = (
    path: string,
    callback: (snapshot: DataSnapshot) => void,
    useFullPath = false,
    onlyOnce = false
  ): void => {
    let getDbRef = ref(db, `users/${user?.id}/${path}`);

    if (useFullPath) {
      getDbRef = ref(db, path);
    }

    onValue(
      getDbRef,
      (snapshot) => {
        callback(snapshot);
      },
      {
        onlyOnce,
      }
    );
  };

  return { getData };
};
