import { ref, set } from "firebase/database";

import { db } from "services/firebase";

import { User } from "models/user";

type usePostUserReturn = Promise<void>;
type usePostUserProps = {
  user: User;
};

const usePostUser = async ({ user }: usePostUserProps): usePostUserReturn => {
  try {
    const docRef = ref(db, "users/" + user.id);

    set(docRef, {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    const err = error as Error;

    console.log("ERROR =>> ", err.message);
  }
};

export default usePostUser;
