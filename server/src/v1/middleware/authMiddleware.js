const isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).send('Access denied.');
    }
    next();
  };
  
  const isTeamLeader = (req, res, next) => {
    if (req.user.role !== 'TEAMLEADER' && req.user.role !== 'ADMIN') {
      return res.status(403).send('Access denied.');
    }
    next();
  };
  
  module.exports = { isAdmin, isTeamLeader };
  