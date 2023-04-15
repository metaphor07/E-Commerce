const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticate");
  }
};

// validate the user, on the basis of token
const verifyTokenAndAuthor = (req, res, next) => {
  // here, we call the above func, and in this we define the next function
  // it means after verify token the next function well run this bellow
  verifyToken(req, res, () => {
    // here, the "params" will get from the function, where this middleware is called
    // it is basically if any one request for "update", "delete" then we need to verify that the requested user is the same user or not
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

// validate token for only admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin };
