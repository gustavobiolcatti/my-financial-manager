import { HTMLAttributes } from 'react';

export type CardBalanceProps = HTMLAttributes<HTMLParagraphElement> & {
  negative?: boolean;
  positive?: boolean;
};
