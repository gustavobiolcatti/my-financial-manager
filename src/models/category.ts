import { uuidv4 } from '@firebase/util';

export const defaultExpenseCategories: Category[] = [
  {
    id: uuidv4(),
    name: 'comida',
    color: '#000',
  },
  {
    id: uuidv4(),
    name: 'educação',
    color: '#000',
  },
  {
    id: uuidv4(),
    name: 'moradia',
    color: '#000',
  },
  {
    id: uuidv4(),
    name: 'saúde',
    color: '#000',
  },
  { id: uuidv4(), name: 'presente', color: '#000' },
  { id: uuidv4(), name: 'shopping', color: '#000' },
  { id: uuidv4(), name: 'lazer', color: '#000' },
];

export const defaultIncomeCategories: Category[] = [
  {
    id: uuidv4(),
    name: 'presente',
    color: '#000',
  },
  {
    id: uuidv4(),
    name: 'reembolso',
    color: '#000',
  },
  {
    id: uuidv4(),
    name: 'salário',
    color: '#000',
  },
  {
    id: uuidv4(),
    name: 'salário',
    color: '#000',
  },
];

export type Category = {
  id: string;
  name: string;
  color: string;
};
