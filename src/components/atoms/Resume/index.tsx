import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useGetData from 'requests/queries/useGetData';

import { Account } from 'models/account';
import { Transation } from 'models/transation';

import { formatDateWithDateFns } from 'utils/formatDate';

import { ResumeProps } from './types';

import * as S from './styles';

const Resume = ({ fullSize, transationDate }: ResumeProps): JSX.Element => {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const { getData } = useGetData();

  const getBalance = (): void => {
    getData('/accounts', (snapshot) => {
      if (snapshot.exists()) {
        const data: Account[] = Object.values(snapshot.val());

        let tempBalance = 0;
        for (let account of data) {
          tempBalance += Number(account.balance);
        }

        setBalance(tempBalance);
      }
    });
  };

  const getTransations = (transationDate?: Date | null): void => {
    const formattedDate = formatDateWithDateFns(
      transationDate || new Date(),
      'MM-yyyy',
    );

    getData(`/transations/${formattedDate}`, (snapshot) => {
      if (snapshot.exists()) {
        const data: Transation[] = Object.values(snapshot.val());

        const expenses: Transation[] = data.filter(
          (transation) => transation?.type === 'EXPENSE',
        );

        const incomes: Transation[] = data.filter(
          (transation) => transation?.type === 'INCOME',
        );

        let expenseTotal = 0;
        for (let transation of expenses) {
          expenseTotal += Number(transation.value);
        }

        let incomeTotal = 0;
        for (let transation of incomes) {
          incomeTotal += Number(transation.value);
        }

        setExpense(expenseTotal);
        setIncome(incomeTotal);
        return;
      }

      setExpense(0);
      setIncome(0);
    });
  };

  useEffect(() => {
    getTransations(transationDate);
  }, [transationDate]);

  useEffect(() => {
    getBalance();
    getTransations(transationDate);
  }, []);

  return (
    <S.Container fullSize={fullSize}>
      <Link to="/accounts">
        <S.Box>
          <S.BoxTitle type="balance">saldo:</S.BoxTitle>
          <S.BoxValue>R$ {balance.toFixed(2)}</S.BoxValue>
        </S.Box>
      </Link>
      <Link to="/transations">
        <S.Box>
          <S.BoxTitle type="expense">despesas:</S.BoxTitle>
          <S.BoxValue>R$ {expense.toFixed(2)}</S.BoxValue>
        </S.Box>
      </Link>
      <Link to="/transations">
        <S.Box>
          <S.BoxTitle type="income">entradas:</S.BoxTitle>
          <S.BoxValue>R$ {income.toFixed(2)}</S.BoxValue>
        </S.Box>
      </Link>
    </S.Container>
  );
};

export default Resume;
