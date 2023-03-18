import { useRef, useEffect } from 'react';
import { ECharts, getInstanceByDom, init } from 'echarts';

import { ChartProps } from 'models/chart';

import * as S from './styles';

const Chart = ({
  title,
  option,
  style,
  settings,
  loading,
  theme = 'light',
}: ChartProps): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: ECharts | undefined;

    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    const resizeChart = (): void => {
      chart?.resize();
    };

    window.addEventListener('resize', resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      chart.setOption(option, settings);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <div
        ref={chartRef}
        style={{ width: '100%', height: '100%', ...style }}
      ></div>
    </S.Container>
  );
};

export default Chart;
