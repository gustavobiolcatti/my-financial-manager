import { useState, useEffect } from 'react';

import useGetData from 'requests/queries/useGetData';

import { ChartProps, PieChartData } from 'models/chart';
import { Transation } from 'models/transation';

import Chart from 'components/atoms/Chart';

import { formatDateWithDateFns } from 'utils/formatDate';

import colors from 'assets/colors';

import * as S from './styles';

type ExpenseIncomeChartProps = {
  transationDate: Date | null;
};

const ExpenseIncomeChart = ({
  transationDate,
}: ExpenseIncomeChartProps): JSX.Element => {
  const [total, setTotal] = useState<PieChartData[]>();

  const { getData } = useGetData();

  const chartOptions: ChartProps['option'] = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '-5',
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

  const getTransations = (): void => {
    if (!transationDate) return;

    const formattedTransationDate = formatDateWithDateFns(
      transationDate,
      'MM-yyyy',
    );

    getData(`/transations/${formattedTransationDate}`, (snapshot) => {
      if (snapshot.exists()) {
        const data: Transation[] = Object.values(snapshot.val());

        const incomeTrasantions: Transation[] = data.filter(
          (transation) => transation?.type === 'INCOME',
        );
        const expenseTrasantions: Transation[] = data.filter(
          (transation) => transation?.type === 'EXPENSE',
        );

        let incomeTempTotal = 0;
        for (const transation of incomeTrasantions) {
          incomeTempTotal += Number(transation.value);
        }

        let expenseTempTotal = 0;
        for (const transation of expenseTrasantions) {
          expenseTempTotal += Number(transation.value);
        }

        const chartData = [
          { value: incomeTempTotal, name: 'Entrada' },
          { value: expenseTempTotal, name: 'Saída' },
        ];

        setTotal(chartData);
        return;
      }

      setTotal(undefined);
    });
  };

  useEffect(() => {
    getTransations();
  }, [transationDate]);

  useEffect(() => {
    getTransations();
  }, []);

  return (
    <S.Container>
      <Chart title="Despesas x Entradas" option={chartOptions} />
    </S.Container>
  );
};

export default ExpenseIncomeChart;
