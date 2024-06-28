const express = require('express');
const authcontrol = require('../controllers/auth-controller')
const {signupSchema , loginSchema} = require('../validators/auth-validator')
const authMiddleware = require('../middleware/auth-middleware')
const validate = require('../middleware/validate-middleware')

const router = express.Router();

router.route('/').get(authcontrol.home)

router.route('/register').post(validate(signupSchema), authcontrol.register)

router.route('/login').post(validate(loginSchema) , authcontrol.login)

router.route('/user').get(authMiddleware , authcontrol.user)

router.put('/users/update/:id', authMiddleware, authcontrol.updateUser);

module.exports = router