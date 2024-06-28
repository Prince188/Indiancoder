const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

router.route('/users').get(authMiddleware, adminMiddleware ,adminController.getAllUsers)   
router.route('/users/:id').get(authMiddleware, adminMiddleware ,adminController.getUserById)   
router.route('/users/update/:id').put(authMiddleware, adminMiddleware ,adminController.updateUser)   
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware ,adminController.deleteUsers)   


router.route('/contact').get(authMiddleware,adminMiddleware, adminController.getAllContacts)

module.exports = router;