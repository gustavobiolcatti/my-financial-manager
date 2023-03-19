import { useState, useEffect } from 'react';

import { ChartProps, PieChartData } from 'models/chart';
import { Transation } from 'models/transation';
import { CategoriesObject } from 'models/category';

import Chart from 'components/atoms/Chart';

import { capitalizeFirstLetterOfEachWorlds } from 'utils/capitalizeFirstLetterOfEachWorlds';

import colors from 'assets/colors';

import * as S from './styles';

type IncomeByCategoryChartProps = {
  transations: Transation[] | null;
  categories: CategoriesObject | null;
};

const IncomeByCategoryChart = ({
  transations,
  categories,
}: IncomeByCategoryChartProps): JSX.Element => {
  const [total, setTotal] = useState<PieChartData[]>();

  const [categoryColors, setCategoryColors] = useState<string[]>();

  const chartOptions: ChartProps['option'] = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '0',
      left: 'center',
    },
    color: categoryColors,
    series: [
      {
        name: 'Entrada x Categoria',
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

  const getCategoriesColors = (): void => {
    if (!categories) return;

    const colors = Object.values(categories).map((category) => category.color);

    setCategoryColors(colors);
  };

  const filterTransationsByCategory = (): void => {
    if (!transations?.length) {
      setTotal([
        {
          value: 0,
          name: 'Sem Entradas',
        },
      ]);
      return;
    }

    if (!categories) return;

    const transationsByCategory = Object.values(categories).map((category) => {
      const filteredTransations: Transation[] = transations.filter(
        (transation) => transation.categoryId === category.id,
      );

      let incomeTempTotal = 0;
      for (const transation of filteredTransations) {
        incomeTempTotal += Number(transation.value);
      }

      return {
        value: incomeTempTotal,
        name: capitalizeFirstLetterOfEachWorlds(category.name),
      };
    });

    setTotal(transationsByCategory);
  };

  useEffect(() => {
    getCategoriesColors();
    filterTransationsByCategory();
  }, [transations]);

  return (
    <S.Container>
      <Chart title="Entradas x Categorias" option={chartOptions} />
    </S.Container>
  );
};

export default IncomeByCategoryChart;
