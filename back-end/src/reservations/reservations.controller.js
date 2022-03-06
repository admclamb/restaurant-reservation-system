const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const reservations = await service.list();
  console.log(reservations);
  console.log("here");
  res.json({
    data: reservations,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
