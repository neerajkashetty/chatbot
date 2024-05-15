const express = require("express");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.get("/verify", validateToken);

module.exports = router;
