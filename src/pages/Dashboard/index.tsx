import { useState } from 'react';
import { DatePicker } from 'rsuite';

import ExpenseByCategoryChart from 'components/molecules/ExpenseByCategoryChart';
import IncomeByCategoryChart from 'components/molecules/IncomeByCategoryChart';
import ExpenseIncomeChart from 'components/molecules/ExpenseIncomeChart';
import TitleContainer from 'components/molecules/TitleContainer';

import * as S from './styles';

const Dashboard = (): JSX.Element => {
  const [transationDate, setTransationDate] = useState<Date | null>(new Date());

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

        <ExpenseByCategoryChart transationDate={transationDate} />
        <IncomeByCategoryChart transationDate={transationDate} />
        <ExpenseIncomeChart transationDate={transationDate} />
      </S.Container>
    </>
  );
};

export default Dashboard;
