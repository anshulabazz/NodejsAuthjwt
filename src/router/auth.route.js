const express = require('express')
module.exports = app => {
    const controller = require('../controllers/auth.controller')
    const mid = require('../middleware/index')
    const router = express.Router()

    router.get("/all", controller.allaccess)
    router.get("/user", [mid.verifytoken, mid.isUser], controller.isuser)
    router.get("/admin", [mid.verifytoken, mid.isAdmin] ,controller.isadmin)
    router.get("/moderator", [mid.verifytoken, mid.isModerator],controller.ismoderator)

    app.use('/', router)


}