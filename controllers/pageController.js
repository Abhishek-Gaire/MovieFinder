exports.getIndex = async (req, res, next) => {
  console.log("Inside index");
  return res.render("index");
};
