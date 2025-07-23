exports.success = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

exports.success = (res, message, data = {}, statusCode = 201) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

exports.error = (res, message, error = '', statusCode = 403) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

exports.error = (res, message, error = '', statusCode = 404) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

exports.error = (res, message, error = '', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};