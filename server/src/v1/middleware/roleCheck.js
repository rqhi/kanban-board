const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send('You do not have permission to perform this action.');
    }
    next();
  };
  
  module.exports = { checkRole };
  