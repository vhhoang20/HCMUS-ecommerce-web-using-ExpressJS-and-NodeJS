const express = require('express');
const router = express.Router()

const user_controller = require('../../controllers/admin/userController')

router.get('/add-user', user_controller.showDetail)

router.post('/:slug', user_controller.uppro)
router.get('/:slug', user_controller.detail)

router.post('/', user_controller.add)
router.get('/', user_controller.index)

module.exports = router