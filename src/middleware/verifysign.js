const db = require('../models/index')
const User = db.user
const ROLES = db.roles



checkDuplicateEmail = (req, res,next) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            return res.staus(500).send(err)
        }
        if (user) {
            return res.status(400).send("Email already exit")
        }
        User.findOne({ username: req.body.username }).exec((err, user) => {
            if (err) {
                return res.staus(500).send(err)
            }
            if (user) {
                return res.status(400).send("Username already exit")
            }
            next()
        })
    })

}
checkroleExisted = (req,res,next) => {
    if (req.body.role) {
       if (!ROLES.includes(req.body.role)) {
          return res.status(400).send({ message: 'Role not existed' })
                 
                
       }
        next()
    }
    
    

}
module.exports = {
    checkDuplicateEmail, checkroleExisted
}