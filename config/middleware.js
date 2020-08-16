// middleware to set flash messages for success and failure
module.exports.setFlash = function (req, res, next) {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  next();
};
