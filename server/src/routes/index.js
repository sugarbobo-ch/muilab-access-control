const express = require('express')
const router = express.Router()

const access = require('./access_router')

router.use(access)
module.exports = router
