function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    const { table_id = "" } = req.params;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          // If being used in PUT it will return the correct information
          if (table_id) {
            return next({ status: 404, message: table_id });
          }
          return next({
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
