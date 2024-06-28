const express = require('express')
const service = require('../controllers/service-controller')
const router = express.Router()

// *   /data will apply before route mentioned below

router.route('/service').get(service.services)
router.route('/form').post(service.servicesForm)
router.route('/delete/:id').delete(service.servicesFormDelete)
router.route('/update/:id').put(service.servicesForUpdate)

module.exports = router