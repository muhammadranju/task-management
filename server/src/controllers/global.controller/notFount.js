const notFoundHandler = (req, res, next) => {
  // Create a new ApiError instance with a 404 status code and a custom message.
  const error = new Error("Not Found");
  error.statusCode = 404;
  error.message = "Not Found";

  // Call the next middleware function with the error.
  next(error);
};

module.exports = notFoundHandler;
