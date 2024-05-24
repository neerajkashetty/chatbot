const JWT = require("jsonwebtoken");
const fs = require("fs");
const { Navigate } = require("react-router-dom");

async function validateToken(req, res, next) {
  const privateKey = fs.readFileSync("./jwtRS256.key", "utf-8");

  const authToken = req.headers["authorization"];

  const parse = JSON.parse(authToken);

  if (!authToken) {
    return res.json({ success: false, message: "Access denied, no jwt" });
  }

  JWT.verify(parse, privateKey, { algorithms: "RS256" }, async (err, token) => {
    if (err) {
      console.log("JWT Verification error:", err);
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
    req.id = token;
    return res.status(200).json({ success: true, message: "Token is valid" });
  });
}

module.exports = validateToken;
