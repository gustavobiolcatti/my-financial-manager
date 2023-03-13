import { ref, set } from 'firebase/database';

import { db } from 'services/firebase';

import { User } from 'models/user';

type usePostUserReturn = Promise<void>;

const usePostUser = async (user: User): usePostUserReturn => {
  try {
    const docRef = ref(db, 'users/' + user.id);

    set(docRef, {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    const err = error as Error;

    console.log('ERROR =>> ', err.message);
  }
};

export default usePostUser;
