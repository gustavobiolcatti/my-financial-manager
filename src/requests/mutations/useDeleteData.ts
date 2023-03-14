import { ref, remove } from 'firebase/database';

import { useAuth } from 'contexts/AuthContext';

import { db } from 'services/firebase';

type UseDeleteDataReturn = {
  deleteData: (path: string, useFullPath?: boolean) => void;
};

const useDeleteData = (): UseDeleteDataReturn => {
  const { user } = useAuth();

  const deleteData = (path: string, useFullPath = false): void => {
    let dbRef = ref(db, `users/${user?.id}/${path}`);

    if (useFullPath) {
      dbRef = ref(db, path);
    }

    remove(dbRef);
  };

  return { deleteData };
};

export default useDeleteData;
