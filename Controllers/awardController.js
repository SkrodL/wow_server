const {Award} = require('../models/models')
class AwardController {
    async getAwards(req, res) {
        let {heroId} = req.query
        let awards
        if(heroId){
            awards = await Award.findAll({where: {heroId}})
        }else{
            awards = await Award.findAll()
        }

        return res.json(awards)
    }
}

module.exports = new AwardController()