const express = require('express');
const validateToken = require('../src/middlewares/validateToken');
const router = express.Router();


router.get("/verify", validateToken);


module.exports = router;