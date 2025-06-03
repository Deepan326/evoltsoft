const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {


  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({ message: "Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export default  verifyToken;
