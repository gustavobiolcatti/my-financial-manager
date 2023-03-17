export enum transationTypeEnum {
  EXPENSE = 'DESPESA',
  INCOME = 'ENTRADA',
  ALL = 'TODAS',
}

export const transationTypeEnumTranslate = (type: string) => {
  switch (type) {
    case 'EXPENSE':
      return transationTypeEnum.EXPENSE;

    case 'INCOME':
      return transationTypeEnum.INCOME;

    case 'ALL':
      return transationTypeEnum.ALL;

    default:
      break;
  }
};
