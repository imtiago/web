import Swal from 'sweetalert2';

const alert = (message: string, icon: any, isToast: boolean, title?: string) => {
  return isToast
    ? Swal.fire({
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        title,
        position: 'top-end',
        confirmButtonColor: icon,
        text: message,
        icon,
      })
    : Swal.fire({
        showConfirmButton: true,
        title,
        position: 'center',
        confirmButtonColor: icon,
        text: message,
        icon,
      });
};

interface IAlertProps {
  message: string;
  isToast?: boolean;
  title?: string;
}

export const alertSuccess = ({ message, isToast = true, title }: IAlertProps) =>
  alert(message, 'success', isToast, title);
export const alertInfo = ({ message, isToast = true, title }: IAlertProps) => alert(message, 'info', isToast, title);
export const alertError = ({ message, isToast = true, title }: IAlertProps) => alert(message, 'error', isToast, title);
export const alertWarning = ({ message, isToast = true, title }: IAlertProps) =>
  alert(message, 'warning', isToast, title);
export const alertQuestion = async ({ message, title }: IAlertProps) => {
  const requestResponse = await Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1e1b4b',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
  });
  return requestResponse.isConfirmed ? true : false;
};
