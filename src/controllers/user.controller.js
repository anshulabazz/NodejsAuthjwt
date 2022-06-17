const db = require('../models/index')
const bcrypt = require('bcryptjs')
const User = db.user
const Roles = db.role
const jwt = require('jsonwebtoken')
exports.signup = (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({message: "Required Field"})
    }
    if (!req.body.password) {
        return res.status(400).send({ message: "Required Field" })
    }
    if (!req.body.email) {
        return res.status(400).send({ message: "Required Field" })
    }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save((err, user) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (req.body.role) {
            Roles.find({ name: req.body.role }, (err, roles) => {
                if (err) {
                    return res.status(500).send(err)
                }
                user.role= roles.map(role=>role.id)
                user.save((err, user) => {
                    if (err) {
                        return  res.status(500).send(err)
                    }
                    return res.status(200).send(user)


                })

            })

        }

    })

}
exports.signin = (req, res) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (!user) {
            return res.status(400).send({message:"Usrname or password incorrect"})
        }
        var passwordvalid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordvalid) {
            return res.status(400).send({ message: " password incorrect" })
        }
        var token = jwt.sign({id:user._id},process.env.SECRET)

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            token: token
        })
    })
}
exports.getdata = (req, res) => {
    User.findById(req.userid).exec((err, user)=>{
        if (err) {
            res.status(500).send("No data")
        }
        res.status(200).send(user)
    })
}