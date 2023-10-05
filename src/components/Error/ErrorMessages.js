import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const onSuccess = (message) => {
  toast.success(message, options);
};

export const onWarning = (message) => {
  toast.warn(message, options);
};

export const onError = (message) => {
  toast.error(message, options);
};
