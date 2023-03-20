import { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';

import { Transation } from 'models/transation';
import { CategoriesObject } from 'models/category';

import Resume from 'components/atoms/Resume';
import ExpenseByCategoryChart from 'components/molecules/ExpenseByCategoryChart';
import IncomeByCategoryChart from 'components/molecules/IncomeByCategoryChart';
import ExpenseIncomeChart from 'components/molecules/ExpenseIncomeChart';
import TitleContainer from 'components/molecules/TitleContainer';

import { formatDateWithDateFns } from 'utils/formatDate';

import * as S from './styles';

const Dashboard = (): JSX.Element => {
  const [transationDate, setTransationDate] = useState<Date | null>(new Date());

  const [expenseTransations, setExpenseTransations] = useState<
    Transation[] | null
  >(null);
  const [incomeTransations, setIncomeTransations] = useState<
    Transation[] | null
  >(null);

  const [categories, setCategories] = useState<CategoriesObject[] | null>(null);
  const [expenseCategories, setExpenseCategories] =
    useState<CategoriesObject | null>(null);
  const [incomeCategories, setIncomeCategories] =
    useState<CategoriesObject | null>(null);

  const { getData } = useGetData();

  const getCategories = (): void => {
    getData(`/categories`, (snapshot) => {
      const data: CategoriesObject[] = Object.values(snapshot.val());

      setCategories(data);

      setExpenseCategories(data[0]);
      setIncomeCategories(data[1]);
    });
  };

  const getTransations = (transationDate: Date | null): void => {
    if (!transationDate) return;

    const formattedTransationDate = formatDateWithDateFns(
      transationDate,
      'MM-yyyy',
    );

    getData(`/transations/${formattedTransationDate}`, (snapshot) => {
      if (snapshot.exists()) {
        const data: Transation[] = Object.values(snapshot.val());

        const expenses: Transation[] = data.filter(
          (transation) => transation?.type === 'EXPENSE',
        );

        const incomes: Transation[] = data.filter(
          (transation) => transation?.type === 'INCOME',
        );

        setExpenseTransations(expenses);
        setIncomeTransations(incomes);
        return;
      }

      setExpenseTransations(null);
      setIncomeTransations(null);
    });
  };

  useEffect(() => {
    getTransations(transationDate);
  }, [transationDate, expenseCategories, incomeCategories]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <TitleContainer title="dashboard" />
      <S.Container>
        <S.FilterWrapper>
          <DatePicker
            format="yyyy-MM"
            placeholder="Mês"
            value={transationDate}
            onChange={(value) => setTransationDate(value)}
            cleanable={false}
            style={{ width: 200 }}
          />
        </S.FilterWrapper>

        {categories && (
          <>
            <ExpenseIncomeChart
              expenses={expenseTransations}
              incomes={incomeTransations}
            />
            <Resume transationDate={transationDate} fullSize />
            <ExpenseByCategoryChart
              categories={expenseCategories}
              transations={expenseTransations}
            />
            <IncomeByCategoryChart
              categories={incomeCategories}
              transations={incomeTransations}
            />
          </>
        )}
      </S.Container>
    </>
  );
};

export default Dashboard;
