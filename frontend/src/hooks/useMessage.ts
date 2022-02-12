import { useCallback } from "react";
import { toast } from 'react-toastify';

type Props = {
    message: string;
    type?: "info" | "success" | "warning" | "error" | "default";
};

export const useMessage = () => {
    const showMessage = useCallback((props: Props) => {
        const { message, type } = props;

        const options = {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }

        switch (type) {
            case 'info':
                toast.info(message, options);
                break;
            case 'success':
                toast.success(message, options);
                break;
            case 'warning':
                toast.warn(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            default:
                toast(message, options);
                break;
        }
    },[]);
    
    return { showMessage };
};
