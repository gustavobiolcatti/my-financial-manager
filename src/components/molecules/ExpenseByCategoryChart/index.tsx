import { useState, useEffect } from 'react';

import { ChartProps, PieChartData } from 'models/chart';
import { Transation } from 'models/transation';
import { CategoriesObject } from 'models/category';

import Chart from 'components/atoms/Chart';

import { capitalizeFirstLetterOfEachWorlds } from 'utils/capitalizeFirstLetterOfEachWorlds';

import colors from 'assets/colors';

import * as S from './styles';

type ExpenseByCategoryChartProps = {
  transations: Transation[] | null;
  categories: CategoriesObject | null;
};

const ExpenseByCategoryChart = ({
  transations,
  categories,
}: ExpenseByCategoryChartProps): JSX.Element => {
  const [total, setTotal] = useState<PieChartData[]>();

  const [categoryColors, setCategoryColors] = useState<string[]>();

  const chartOptions: ChartProps['option'] = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '0',
      left: 'center',
      show: false,
    },
    color: categoryColors,
    series: [
      {
        name: 'Despesa x Categoria',
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

  const getCategoriesColors = (categories: CategoriesObject | null): void => {
    if (!categories) return;

    const colors = Object.values(categories).map((category) => category.color);

    setCategoryColors(colors);
  };

  const filterTransationsByCategory = (
    transations: Transation[] | null,
    categories: CategoriesObject | null,
  ): void => {
    if (!transations?.length) {
      setTotal([
        {
          value: 0,
          name: 'Sem Despesas',
        },
      ]);
      return;
    }

    if (!categories) return;

    const transationsByCategory = Object.values(categories).map((category) => {
      const filteredTransations: Transation[] = transations.filter(
        (transation) => transation.categoryId === category.id,
      );

      let expenseTempTotal = 0;
      for (const transation of filteredTransations) {
        expenseTempTotal += Number(transation.value);
      }

      return {
        value: expenseTempTotal,
        name: capitalizeFirstLetterOfEachWorlds(category.name),
      };
    });

    setTotal(transationsByCategory);
  };

  useEffect(() => {
    getCategoriesColors(categories);
    filterTransationsByCategory(transations, categories);
  }, [transations]);

  return (
    <S.Container>
      <Chart title="Despesas x Categorias" option={chartOptions} />
    </S.Container>
  );
};

export default ExpenseByCategoryChart;
