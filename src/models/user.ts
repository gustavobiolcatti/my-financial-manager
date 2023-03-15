import { Account } from 'models/account';
import { Category } from 'models/category';

export type User = {
  id: string;
  name: string | null;
  avatar: string | null;
  email: string | null;
  accounts?: Account[];
  categories?: Category[];
};
