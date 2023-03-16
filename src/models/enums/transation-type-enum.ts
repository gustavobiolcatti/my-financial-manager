export enum transationTypeEnum {
  EXPENSE = 'DESPESA',
  INCOME = 'ENTRADA',
}

export const transationTypeEnumTranslate = (type: string) => {
  switch (type) {
    case 'EXPENSE':
      return transationTypeEnum.EXPENSE;

    case 'INCOME':
      return transationTypeEnum.INCOME;

    default:
      break;
  }
};
