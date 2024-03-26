const {auth} = require('./authMiddleware')
const isAdmin = require('./isAdmin');

module.exports = {
   auth,
   isAdmin
}