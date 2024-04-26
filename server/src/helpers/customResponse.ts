export const sendResponse = (res, status, statusCode, data, message) => {
  const response = {
    status: status,
    message: message,
    data: null,
  };
  if (data && data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
