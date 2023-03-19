import { useState, useEffect } from 'react';

import { ChartProps, PieChartData } from 'models/chart';
import { Transation } from 'models/transation';

import Chart from 'components/atoms/Chart';

import colors from 'assets/colors';

import * as S from './styles';

type ExpenseIncomeChartProps = {
  expenses: Transation[] | null;
  incomes: Transation[] | null;
};

const ExpenseIncomeChart = ({
  expenses,
  incomes,
}: ExpenseIncomeChartProps): JSX.Element => {
  const [total, setTotal] = useState<PieChartData[]>();

  const chartOptions: ChartProps['option'] = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '0',
      left: 'center',
    },
    color: [colors.green, colors.red],
    series: [
      {
        name: 'Despesa x Entrada',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 15,
          borderColor: colors.white,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: total,
      },
    ],
  };

  const filterTransationsByCategory = (): void => {
    let incomeTempTotal = 0;
    if (incomes) {
      for (const transation of incomes) {
        incomeTempTotal += Number(transation.value);
      }
    }

    let expenseTempTotal = 0;
    if (expenses) {
      for (const transation of expenses) {
        expenseTempTotal += Number(transation.value);
      }
    }

    const chartData = [
      { value: incomeTempTotal, name: 'Entrada' },
      { value: expenseTempTotal, name: 'Despesa' },
    ];

    setTotal(chartData);
  };

  useEffect(() => {
    filterTransationsByCategory();
  }, [expenses, incomes]);

  return (
    <S.Container>
      <Chart title="Despesas x Entradas" option={chartOptions} />
    </S.Container>
  );
};

export default ExpenseIncomeChart;
