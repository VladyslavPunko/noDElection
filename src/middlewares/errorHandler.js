export const errorHandler = (err, req, res, next) => {
  res.status(500).err({
    message: "Something went wrong!",
    error: err.message,
  });
};
