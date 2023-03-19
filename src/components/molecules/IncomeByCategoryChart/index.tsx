import { useState, useEffect } from 'react';

import useGetData from 'requests/queries/useGetData';

import { ChartProps, PieChartData } from 'models/chart';
import { Transation } from 'models/transation';
import { Category } from 'models/category';

import Chart from 'components/atoms/Chart';

import { capitalizeFirstLetterOfEachWorlds } from 'utils/capitalizeFirstLetterOfEachWorlds';

import colors from 'assets/colors';

import * as S from './styles';

type IncomeByCategoryChartProps = {
  transations: Transation[];
};

const IncomeByCategoryChart = ({
  transations,
}: IncomeByCategoryChartProps): JSX.Element => {
  const [total, setTotal] = useState<PieChartData[]>();

  const [categories, setCategories] = useState<Category[]>();
  const [categoryColors, setCategoryColors] = useState<string[]>();

  const { getData } = useGetData();

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

  const getCategories = (): void => {
    getData(`/categories/income`, (snapshot) => {
      const data: Category[] = Object.values(snapshot.val());

      const colors = data.map((category) => category.color);

      setCategories(data);
      setCategoryColors(colors);
    });
  };

  const filterTransationsByCategory = (): void => {
    const transationsByCategory = categories?.map((category) => {
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
    filterTransationsByCategory();
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <S.Container>
      <Chart title="Entradas x Categorias" option={chartOptions} />
    </S.Container>
  );
};

export default IncomeByCategoryChart;
