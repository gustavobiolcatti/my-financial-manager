import { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';

import { Transation } from 'models/transation';

import ExpenseByCategoryChart from 'components/molecules/ExpenseByCategoryChart';
import IncomeByCategoryChart from 'components/molecules/IncomeByCategoryChart';
import ExpenseIncomeChart from 'components/molecules/ExpenseIncomeChart';
import TitleContainer from 'components/molecules/TitleContainer';

import { formatDateWithDateFns } from 'utils/formatDate';

import * as S from './styles';

const Dashboard = (): JSX.Element => {
  const [transationDate, setTransationDate] = useState<Date | null>(new Date());
  const [transations, setTransations] = useState<Transation[] | null>(null);
  const [expenseTransations, setExpenseTransations] = useState<
    Transation[] | null
  >(null);
  const [incomeTransations, setIncomeTransations] = useState<
    Transation[] | null
  >(null);

  const { getData } = useGetData();

  const getTransations = (): void => {
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
        setTransations(data);
      }
    });
  };

  const canShowCharts = transations && expenseTransations && incomeTransations;

  useEffect(() => {
    getTransations();
  }, [transationDate]);

  useEffect(() => {
    getTransations();
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

        {canShowCharts && (
          <>
            <ExpenseByCategoryChart transations={expenseTransations} />
            <IncomeByCategoryChart transations={incomeTransations} />
            <ExpenseIncomeChart
              expenses={expenseTransations}
              incomes={incomeTransations}
            />
          </>
        )}
      </S.Container>
    </>
  );
};

export default Dashboard;
