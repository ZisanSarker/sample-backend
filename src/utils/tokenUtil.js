const JWT = require('jsonwebtoken');

const generateToken = (userId, expiresIn = "7d") => {
  return JWT.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
  generateToken,
};

/*
const generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }); // token expires in 1 hour
    return token;
};
*/
