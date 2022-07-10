const jwt = require("jsonwebtoken");
const { User } = require("../db");

const Auth = async (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) return res.status(401).send({ message: "Sin autorización" });
  
    token = token.split(" ")[1];
  
    if (!token) return res.status(401).send({ message: "Sin autorización" });
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      req.usuario = payload;
      next();
    } catch (err) {
      log.error(err);
      res.status(403).send({ message: "Sin autorización" });
    }
};

module.exports = Auth;
