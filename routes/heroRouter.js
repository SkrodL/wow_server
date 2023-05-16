const Router = require('express')
const router = new Router()
const heroController = require('../Controllers/heroController')

router.post('/', heroController.create)
router.get('/', heroController.getAll)
router.get('/count', heroController.getCount)
router.get('/:id', heroController.getOne)

module.exports = router