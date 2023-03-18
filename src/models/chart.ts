import { CSSProperties, HTMLAttributes } from 'react';
import { EChartOption, SetOptionOpts } from 'echarts';

export type ChartProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  option: EChartOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
};

export type PieChartData = {
  value: number;
  name: string;
};
