const mongoose = require('mongoose')
const User = require('./user.model')
const Role = require('./role.model')

const db = {}
db.user = User
db.role = Role
db.roles= ["admin","user","moderator"]
db.mongoose = mongoose

module.exports = db;