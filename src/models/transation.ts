import { Category } from 'models/category';

export type Transation = {
  value: number;
  date: Date;
  description?: string;
  type: 'expense' | 'income';
  category: Category;
  account: string;
};
