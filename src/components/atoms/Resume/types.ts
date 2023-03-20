import { HTMLAttributes } from 'react';

export type ResumeProps = HTMLAttributes<HTMLDivElement> & {
  fullSize?: boolean;
  transationDate?: Date | null;
}

export type BoxTitleProps = HTMLAttributes<HTMLSpanElement> & {
  type: 'balance' | 'income' | 'expense';
}