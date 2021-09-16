const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../../config");
const { User } = require("../../../db/models");
const bearerToken = require("express-bearer-token");
const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // const token = jwt.sign({ data: userDataForToken }, secret);
  // const token = jwt.sign({ data: userDataForToken }, process.env.JWT_SECRET);
  const token = jwt.sign({ data: userDataForToken }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10),
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  //Changed jwt token here as well
  return jwt.verify(
    token,
    process.env.JWT_SECRET,
    null,
    async (err, jwtPayload) => {
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
    }
  );
};

const requireAuth = [bearerToken(), restoreUser];
module.exports = { getUserToken, requireAuth };
