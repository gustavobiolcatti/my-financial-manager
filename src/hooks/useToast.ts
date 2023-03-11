import { Id, toast } from 'react-toastify';

import colors from 'assets/colors';

type ToastOptions = {
  message: string;
  type: 'error' | 'success';
};

type UseToastReturn = {
  showToast: ({ message, type }: ToastOptions) => Id;
};

export const useToast = (): UseToastReturn => {
  const showToast = ({ message, type }: ToastOptions): Id =>
    toast(message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      closeButton: false,
      pauseOnHover: true,
      style: {
        borderRadius: '10px',
        backgroundColor: type === 'error' ? colors.red : colors.green,
        color: colors.white,
      },
    });

  return { showToast };
};
