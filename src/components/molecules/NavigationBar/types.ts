import { HTMLAttributes } from 'react';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  active: boolean;
};
