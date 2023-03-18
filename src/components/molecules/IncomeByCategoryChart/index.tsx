import { useState, useEffect } from 'react';

import useGetData from 'requests/queries/useGetData';

import { ChartProps, PieChartData } from 'models/chart';
import { Transation } from 'models/transation';
import { Category } from 'models/category';

import Chart from 'components/atoms/Chart';

import { formatDateWithDateFns } from 'utils/formatDate';
import { capitalizeFirstLetterOfEachWorlds } from 'utils/capitalizeFirstLetterOfEachWorlds';

import colors from 'assets/colors';

import * as S from './styles';

type IncomeByCategoryChartProps = {
  transationDate: Date | null;
};

const IncomeByCategoryChart = ({
  transationDate,
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
      bottom: '-5',
      left: 'center',
    },
    color: categoryColors,
    series: [
      {
        name: 'Entrada x Entrada',
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

        const transationsByCategory = categories?.map((category) => {
          const filteredTransations: Transation[] = incomeTrasantions.filter(
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
        console.log(total);
        return;
      }

      setTotal(undefined);
    });
  };

  useEffect(() => {
    getTransations();
  }, [transationDate, categories]);

  useEffect(() => {
    getCategories();
    getTransations();
  }, []);

  return (
    <S.Container>
      <Chart title="Entradas x Categorias" option={chartOptions} />
    </S.Container>
  );
};

export default IncomeByCategoryChart;
