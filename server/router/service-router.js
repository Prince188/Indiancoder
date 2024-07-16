const express = require('express')
const service = require('../controllers/service-controller')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router()

// *   /data will apply before route mentioned below

router.route('/service').get(service.services) // to get all the services
router.route('/service/:id').get(service.singleservices) // to get all the services by id
router.route('/form').post(service.servicesForm) //Uset to open the form for addd services
router.route('/delete/:id').delete(service.servicesFormDelete)  // Use to open the delete the service using id
router.route('/update/:id').put(service.servicesForUpdate) // Use to open the update the service using id
// router.route('/wishlist/:id').post(authMiddleware,service.wishlist)
// router.route('/wishlist').get(service.getWishlist)


module.exports = router