const jwt = require('jsonwebtoken')
const db = require('../models/index')
const User = db.user
const Role =db.role

verifytoken = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
       res.send(400).send({message:'Token is not provided'})
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
           res.status(500).send({message: 'Something went wrong'})
        }
        
        req.userid = decoded.id
      



    })
    next()
}
isAdmin = (req, res, next) => {
    User.findById(req.userid).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: 'Something went wrong' })
        }
        Role.find({ _id: user.role }, (err, roles) => {
            if (err) {
                res.status(500).send({ message: 'Something went wrong' })
            }
            console.log(roles)
            for (let i = 0; i<roles.length; i++) {
                if (roles[i].name === "admin") {
                    next()
                    return

                }
            }
            
            
            res.status(500).send({ message: 'Admin ROle required' })
        })

    })
}
isUser = (req, res, next) => {
    User.findById(req.userid).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: 'Something went wrong' })
        }
        Role.find({ _id: user.role }, (err, roles) => {
            if (err) {
                res.status(500).send({ message: 'Something went wrong' })
            }
            console.log(roles)
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "user") {
                    next()
                    return

                }
            }


            res.status(500).send({ message: 'Admin ROle required' })
        })

    })
}
isModerator = (req, res, next) => {
    User.findById(req.userid).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: 'Something went wrong' })
        }
        Role.find({ _id: user.role }, (err, roles) => {
            if (err) {
                res.status(500).send({ message: 'Something went wrong' })
            }
            console.log(roles)
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next()
                    return

                }
            }


            res.status(500).send({ message: 'Admin ROle required' })
        })

    })
}

module.exports = {
    verifytoken, isAdmin,isUser,isModerator
}