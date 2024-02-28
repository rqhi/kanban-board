const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Administrator') {
      return res.status(403).send('Access denied.');
    }
    next();
  };
  
  const isProjektmanager = (req, res, next) => {
    if (req.user.role !== 'Projektmanager' && req.user.role !== 'Administrator') {
      return res.status(403).send('Access denied.');
    }
    next();
  };
  
  module.exports = { isAdmin, isProjektmanager };
  