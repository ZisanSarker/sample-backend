const { expressjwt: jwt } = require("express-jwt");

// Middleware to require sign-in by validating JWT token
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = requireSignIn;
