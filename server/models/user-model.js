const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique:true
    },
    email: {
        type: String,
        required: true,
        // unique:true
    },
    phone: {
        type: String,
        required: true,
        // unique:true
    },
    password: {
        type: String,
        required: true,
        // unique:true
    },
    isAdmin: {
        type: Boolean,
        // required:true,
        default: false
    }
}, {
    timestamps: true,
})


//jwt

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )
    } catch (error) {
        console.log(error);
    }
}

//define collection name
const User = new mongoose.model('User', userSchema)

module.exports = User;