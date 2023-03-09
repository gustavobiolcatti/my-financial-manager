import { push, ref, set } from "firebase/database";

import { db } from "./firebase";

export const postData = (
  path: string,
  values: Record<string, unknown>
): void => {
  const createNewRef = ref(db, path);
  const newRefPost = push(createNewRef);

  set(newRefPost, values);
};
