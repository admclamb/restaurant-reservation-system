function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    console.log("HERE: ", data);
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          next({
            status: 400,
            message: `A '${property}' property is required`,
          });
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;
