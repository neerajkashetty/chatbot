const JWT = require('jsonwebtoken')
const fs = require('fs');
const { Navigate } = require('react-router-dom');

async function validateToken(req, res, next) {
    const privateKey = fs.readFileSync("./jwtRS256.key", "utf-8");

    const authToken = req.headers["authorization"];

    const parse = JSON.parse(authToken)

    console.log(parse)

    console.log("token verification.",authToken)

    if (!authToken) {
        return res.json({ success: false, message: "Access denied, no jwt" });
    }

    JWT.verify(parse, "hello", {algorithms: 'HS256' }, async (err, token) => {
        if (err) {
            console.log('JWT Verification error:', err);
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }
        req.id = token;
        console.log(req.id);
        return res.status(200).json({ success: true, message: 'Token is valid' });
    });
}

module.exports = validateToken;
