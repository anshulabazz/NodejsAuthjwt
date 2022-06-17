const express = require('express')
module.exports = app => {
    const controller = require('../controllers/user.controller')
    const mid = require('../middleware/index')
    const router = express.Router()

    router.post("/signup", [mid.checkDuplicateEmail, mid.checkroleExisted], controller.signup)
    router.post("/signin", controller.signin)
    router.get("/getbyid", [mid.verifytoken], controller.getdata)
    app.use('/', router)


}