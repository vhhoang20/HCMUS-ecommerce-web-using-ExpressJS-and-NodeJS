const express = require('express');
const router = express.Router()

const bill_controller = require('../../controllers/admin/billController')

router.post('/:slug', bill_controller.uppro)
router.get('/:slug', bill_controller.detail)
router.get('/', bill_controller.index)

module.exports = router