import { child, get, ref } from 'firebase/database';

import { db } from 'services/firebase';

import { User } from 'models/user';

type useListUserReturn = {
  data: User | null;
};
type useListUserProps = {
  id: string;
};

const useListUser = async ({
  id,
}: useListUserProps): Promise<useListUserReturn> => {
  try {
    const dbRef = ref(db);
    const docRef = child(dbRef, `users/${id}`);

    const data = await get(docRef);

    if (data.exists()) return { data: data.val() };
  } catch (error) {
    const err = error as Error;

    console.log('ERROR =>> ', err.message);
  }

  return { data: null };
};

export default useListUser;
