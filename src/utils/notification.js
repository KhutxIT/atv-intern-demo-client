import {
  Id,
  toast,
  ToastContent,
  ToastOptions,
  UpdateOptions,
} from 'react-toastify';

let currentLoading;

/**
 *
 * @param {ToastContent} content
 * @param {ToastOptions} options
 */
export function loading(content, options) {
  if (currentLoading) return;

  currentLoading = toast.loading(content, {
    type: 'warning',
  });
}

export function success(content) {
  toast.success(content, {
    type: 'success',
  });
}

export function failure(content) {
  toast.error(content, {
    type: 'error',
  });
}

/**
 *
 * @param {Id} id
 * @param {UpdateOptions} options
 */
export function updateCurrentLoadingToSuccess(content) {
  if (!currentLoading) return;

  const id = currentLoading;
  currentLoading = null;
  toast.update(id, {
    render: content,
    type: 'success',
    isLoading: false,
    autoClose: 2000,
    hideProgressBar: false,
  });
}

export function updateCurrentLoadingToError(content) {
  if (!currentLoading) return;

  const id = currentLoading;
  currentLoading = null;
  toast.update(id, {
    render: content,
    type: 'error',
    isLoading: false,
    autoClose: 2000,
    hideProgressBar: false,
  });
}

export function info(content) {
  toast.info(content, {
    position: 'bottom-right',
  });
}

const Notification = {
  loading,
  success,
  updateCurrentLoadingToSuccess,
  updateCurrentLoadingToError,
  info,
  failure,
};

export default Notification;
