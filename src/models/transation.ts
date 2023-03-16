export type Transation = {
  id: string;
  value: number | string;
  date: Date;
  type: 'EXPENSE' | 'INCOME';
  categoryId: string;
  description: string;
  accountId: string;
};
