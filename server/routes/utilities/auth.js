const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../config");
const { User } = require("../../db/models");
const bearerToken = require("express-bearer-token");
const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // const token = jwt.sign({ data: userDataForToken }, secret);
  const token = jwt.sign({ data: userDataForToken }, process.env.JWT_SECRET);

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;
    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      return next(e);
    }
    if (!req.user) {
      return res.set("WWW-Authenicate", "Bearer").status(401).end();
    }
    return next();
  });
};

const requireAuth = [bearerToken(), restoreUser];
module.exports = { getUserToken, requireAuth };
