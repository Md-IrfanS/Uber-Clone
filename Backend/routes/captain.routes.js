const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerCaptain, loginCaptain, getCaptainProfile, captainLogout } = require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({min: 1}).withMessage('Capacity must be least 1'),
    body('vehicle.vehicleType').isIn(['Car', 'MotorCycle', 'Auto']).withMessage('Invalid vehicle type'),
], registerCaptain);

router.post('/login', [ body('email').isEmail().withMessage('Invalid Email'),body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')], loginCaptain)

router.get('/profile', authCaptain, getCaptainProfile);

router.post('/logout', authCaptain, captainLogout);

module.exports = router;