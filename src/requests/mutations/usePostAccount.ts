import { ref, set } from 'firebase/database';

import { useAuth } from 'contexts/AuthContext';

import { db } from 'services/firebase';

import { Account } from 'models/account';

type usePostAccountReturn = Promise<void>;

const usePostAccount = async (
  account: Account
): usePostAccountReturn => {
  const { user } = useAuth();

  try {
    const docRef = ref(db, `users/${user?.id}/accounts/${account.id}`);

    set(docRef, {
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance,
    });
  } catch (error) {
    const err = error as Error;

    console.log('ERROR =>> ', err.message);
  }
};

export default usePostAccount;
