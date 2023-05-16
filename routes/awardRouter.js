const Router = require('express')
const router = new Router()
const awardController = require('../Controllers/awardController')

router.get('/', awardController.getAwards)

module.exports = router