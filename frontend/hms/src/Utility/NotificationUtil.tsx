import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const successNotification = (message: string) => {
  notifications.show({
    title: 'Success',
    message: message,
    color: 'teal',
    icon: <IconCheck />,
    withCloseButton: true,
    withBorder: true,
    className: '!border-green-500 max-w-[90vw] sm:max-w-md text-sm sm:text-base',
    styles: {
      title: { fontWeight: 600, fontSize: '1rem' },
      description: { whiteSpace: 'pre-line', wordBreak: 'break-word' },
      root: {
        position: 'fixed',
        zIndex: 9999,
      },
    },
    position: 'top-right',  // Use one of the allowed positions like 'top-right'
  });
};

const errorNotification = (message: string) => {
  notifications.show({
    id: 'error',
    title: 'Error!',
    message: message,
    color: 'red',
    icon: <IconX />,
    withCloseButton: true,
    withBorder: true,
    autoClose: 4000,
    className:
      '!border-red-300 animate-notification cursor-pointer w-[400px] max-w-[90vw] text-sm sm:text-base rounded-lg',
    onClick: () => notifications.hide('error'),
    styles: {
      title: { fontWeight: 600, fontSize: '1rem' },
      description: { whiteSpace: 'pre-line', wordBreak: 'break-word' },
      root: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      },
    },
  });
};

const warningNotification = (message: string) => {
  notifications.show({
    title: 'Warning!',
    message: message,
    color: 'orange',
    icon: <IconX />,
    withCloseButton: true,
    withBorder: true,
    className:
      '!border-orange-500 max-w-[90vw] sm:max-w-md text-sm sm:text-base',
    styles: {
      title: { fontWeight: 600, fontSize: '1rem' },
      description: { whiteSpace: 'pre-line', wordBreak: 'break-word' },
      
    },
    position: 'top-left', // Use one of the allowed positions like 'top-right'
  });
};

export { successNotification, errorNotification, warningNotification };
