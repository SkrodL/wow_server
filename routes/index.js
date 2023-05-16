const Router = require('express')
const router = new Router()
const heroRouter = require('./heroRouter')
const awardRouter = require('./awardRouter')

router.use('/hero', heroRouter)
router.use('/award', awardRouter)

module.exports = router