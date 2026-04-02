// components/LogoutToast.tsx
import { useEffect } from 'react';
import { Toast } from './Toast';

interface LogoutToastProps {
    show: boolean;
    onClose: () => void;
}

export const LogoutToast = ({ show, onClose }: LogoutToastProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <Toast
            message="Logged out successfully"
            type="success"
            duration={3000}
            position="top-right"
        />
    );
};