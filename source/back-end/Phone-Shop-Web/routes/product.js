const express = require('express');
const router = express.Router()

const product_controller = require('../controllers/productController')

router.get('/:slug', product_controller.detail)
router.get('/', product_controller.index)

module.exports = router