const JWT = require('jsonwebtoken')

async function validateToken(req, res, next) {
    const privateKey = 'dsalkdndlkask';

    const authToken = req.headers["authorization"];

    console.log(authToken)

    if (!authToken) {
        return res.json({ success: false, message: "Access denied" });
    }

    JWT.verify(authToken, privateKey, async (err, token) => {
        if (err) {
            return res.status(401).json({ success: false, message: err });
        }
        req.id = token;
        console.log(req.id);
        next();
    });
}

module.exports = validateToken;
