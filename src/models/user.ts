import { Account } from './account';

export type User = {
  id: string;
  name: string | null;
  avatar: string | null;
  email: string | null;
  accounts?: Account[];
};
