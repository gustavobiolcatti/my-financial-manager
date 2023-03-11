export type Account = {
  id: string;
  name: string;
  type: 'wallet' | 'bank' | 'exchange';
  balance: number;
};
