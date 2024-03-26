const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // If user is an admin, proceed to the next middleware
      next();
    } else {
      // If user is not an admin, return 403 Forbidden error
      return res.status(403).json({ error: 'Unauthorized access. Admin privileges required.' });
    }
  };
  
  module.exports = isAdmin;