import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

const toastQueue: ToastProps[] = [];
let toastCallback: ((toasts: ToastProps[]) => void) | null = null;

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  React.useEffect(() => {
    toastCallback = setToasts;
  }, []);

  const showToast = (props: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = { ...props, id: id as any };
    
    setToasts(prev => [...prev, toast]);

    if (props.duration !== 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, props.duration || 3000);
    }
  };

  return { toasts, showToast };
};
