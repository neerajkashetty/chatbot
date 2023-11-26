const express = require('express')
const userController = require("./controllers/userController.js")
const { Login } = require('../controllers/userController.js')
const {signUp} = userController

const router = express.Router()

router.post('/signUp', signUp)

router.post('Login', Login)

module.exports = router