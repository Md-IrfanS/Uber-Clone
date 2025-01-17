const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be atleast 3 characters long'],            
        },
        lastName: {
            type: String,            
            minlength: [3, 'Last name must be atleast 3 characters long'],            
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String
    }
}, {
    timestamps: true
});


// Sign JWT 
UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    return token 
};


// Hash password
UserSchema.statics.hashPassword = async function(password){
    return bcrypt.hash(password, 10);
};


// Compare password
UserSchema.methods.comparePassword = async function(enterPassword){
    return bcrypt.compare(enterPassword, this.password);
};


const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel