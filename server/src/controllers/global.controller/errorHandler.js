const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    status: err.status,
    statusCode,
    message: err.message,
    error: err,
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : null,
  };
  res.status(statusCode).json(response);
};

module.exports = errorHandler;
