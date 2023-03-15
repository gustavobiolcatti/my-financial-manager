export enum categoryTypeEnum {
  EXPENSE = 'DESPESA',
  INCOME = 'ENTRADA',
}

export const categoryTypeEnumTranslate = (type: string) => {
  switch (type) {
    case 'EXPENSE':
      return categoryTypeEnum.EXPENSE;

    case 'INCOME':
      return categoryTypeEnum.INCOME;

    default:
      break;
  }
};
