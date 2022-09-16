const { churchSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Church = require('./models/church');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in');
    return res.redirect('/admin');
  }
  next();
};

module.exports.validateChurch = (req, res, next) => {
  const { error } = churchSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
