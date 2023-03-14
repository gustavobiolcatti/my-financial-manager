export enum accountTypeEnum {
  wallet = 'CARTEIRA',
  bank = 'BANCO',
  exchange = 'CORRETORA',
}

export const accountTypeEnumTranslate = (type: string) => {
  switch (type) {
    case 'wallet':
      return accountTypeEnum.wallet;

    case 'bank':
      return accountTypeEnum.bank;

    case 'exchange':
      return accountTypeEnum.exchange;

    default:
      break;
  }
};
