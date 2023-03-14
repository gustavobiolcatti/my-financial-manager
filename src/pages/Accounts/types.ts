import { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  newCard?: boolean;
};

export type CardBalanceProps = HTMLAttributes<HTMLParagraphElement> & {
  negative?: boolean;
  positive?: boolean;
};
