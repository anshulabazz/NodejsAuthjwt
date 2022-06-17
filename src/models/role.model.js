const mongoose = require("mongoose");
const roleschema =new mongoose.Schema({
        name: String
})
const Role = mongoose.model("Role",roleschema)
module.exports = Role;