const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerCaptain } = require('../controllers/captain.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({min: 1}).withMessage('Capacity must be least 1'),
    body('vehicle.vehicleType').isIn(['Car', 'MotorCycle', 'Auto']).withMessage('Invalid vehicle type'),
], registerCaptain);


module.exports = router;