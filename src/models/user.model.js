const mongoose = require("mongoose");
const validator = require('validator');


const schema = new mongoose.Schema({
    username: {
        type: String,
        validate(value) {
            if (!validator.isLength(value, { min: 5, max: 15 })) {
                throw new Error('Username  5 chracter required')
                
            }
        }
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value, { min: 7, max: 20 })) {
               throw new Error('Email Required')
            }
        }
    },
    password: {
        type: String,
        validate(value) {
            if (!validator.isLength(value)) {

                throw new Error('Password require strong')
            }
        }

    },
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
})


const User = mongoose.model("User",schema)
module.exports = User;