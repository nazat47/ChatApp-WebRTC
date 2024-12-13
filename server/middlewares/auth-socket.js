const jwt = require("jsonwebtoken");

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
  } catch (error) {
    const socketError = new Error("Not authorized");
    return next(socketError);
  }
  next();
};

module.exports = { verifyTokenSocket };
