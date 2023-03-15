export enum accountTypeEnum {
  WALLET = 'CARTEIRA',
  BANK = 'BANCO',
  EXCHANGE = 'CORRETORA',
}

export const accountTypeEnumTranslate = (type: string) => {
  switch (type) {
    case 'WALLET':
      return accountTypeEnum.WALLET;

    case 'BANK':
      return accountTypeEnum.BANK;

    case 'EXCHANGE':
      return accountTypeEnum.EXCHANGE;

    default:
      break;
  }
};
