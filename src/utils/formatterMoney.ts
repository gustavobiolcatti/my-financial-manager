export const formatterMoney = (
  value: string | number | undefined | null,
): string => {
  if (!value) return 'R$ ---';

  const newValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return newValue.format(Number(value));
};
