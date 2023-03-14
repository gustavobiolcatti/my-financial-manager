export type Transation = {
  value: number;
  date: Date;
  description?: string;
  type: 'expense' | 'income';
  category: string;
  account: string;
};
