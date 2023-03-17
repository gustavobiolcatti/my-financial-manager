export type AccountsObject = {
  [key: string]: Account;
};

export type Account = {
  id: string;
  name: string;
  type: 'WALLET' | 'BANK' | 'EXCHANGE';
  balance: number | string;
  active: boolean;
};
