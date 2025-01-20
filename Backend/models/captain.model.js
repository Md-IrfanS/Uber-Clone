const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CaptainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],            
        },
        lastName: {
            type: String,            
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,        
        trim: true,
        validate: {
            validator: function (email) {
              // Regex pattern for basic email validation
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Please provide a valid email address', // Custom error message for invalid email
        },
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },

    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],            
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['Car', 'MotorCycle', 'Auto'],            
        },        
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});


CaptainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    return token
};

CaptainSchema.statics.hashPassword = async function(password){
    return bcrypt.hash(password, 10);
};

CaptainSchema.methods.comparePassword = async function(enterPassword){
    await bcrypt.compare(enterPassword, this.password);
};


const CaptainModel = mongoose.model('captain', CaptainSchema);

module.exports = CaptainModel;
