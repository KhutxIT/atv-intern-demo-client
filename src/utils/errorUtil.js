/**
 * Return response's data or request exception
 * @param {Error} e
 * @returns {String}
 */
export function getRequestErrorMessage(e) {
  if (!e) {
    return null;
  }

  if (e.isAxiosError) {
    const { data, message } = e.response || {};

    if (data && data.message) return data.message;

    if (message) return message;
  }

  const { message } = e;
  return message;
}
