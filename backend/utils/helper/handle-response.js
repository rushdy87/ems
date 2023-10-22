exports.handleResponse = (res, data, statusCode = 200) => {
  if (data.error) {
    console.error(data.error);
    statusCode = data.statusCode || 500;
  }
  res.status(statusCode).json(data);
};
