const express = require('express')
const userController = require("./controllers/userController.js")
const {signUp, Login} = userController
const validateToken = require("./middlewares/validateToken.js")

const router = express.Router()

router.post('/signUp', signUp)

router.post('Login', validateToken, Login)

module.exports = router