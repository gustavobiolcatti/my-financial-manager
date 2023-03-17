import { ColHTMLAttributes } from 'react';

export type TableColumnProps = ColHTMLAttributes<HTMLTableCellElement> & {
  isValue?: boolean;
  negative?: boolean;
  important?: boolean;
};
