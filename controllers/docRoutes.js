const express = require('express')
const docLoader = require("./controllers/docLoader.js")
const {docLoader} = userController

const router = express.Router()

router.post('/ai', docLoader)


module.exports = router