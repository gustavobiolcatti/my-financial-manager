import { ButtonHTMLAttributes } from 'react';

export type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  actionType: 'update' | 'delete';
};
