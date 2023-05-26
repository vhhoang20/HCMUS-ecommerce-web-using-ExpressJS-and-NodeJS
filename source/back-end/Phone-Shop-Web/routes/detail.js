const express = require('express');
const router = express.Router()

const detail_controller = require('../controllers/detailController')


router.use('/product/:slug', detail_controller.show)

module.exports = router