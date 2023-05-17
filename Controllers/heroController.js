const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const {Hero, Paragraph, Award, Poem} = require('../models/models')
class HeroController {
    async create(req, res, next) {
        try {
            let {name, rank, paragraph, award, poem} = req.body
            // const {photo} = req.files
            // let fileName = uuid.v4() + '.jpg'
            // photo.mv(path.resolve(__dirname, '..', 'static', fileName))
            const hero = await Hero.create({name, rank, photo: fileName})


            if (paragraph) {
                paragraph = JSON.parse(paragraph)
                paragraph.forEach(i =>
                    Paragraph.create({
                        value: i.value,
                        heroId: hero.id
                    })
                )
            }

            if (award) {
                award = JSON.parse(award)
                award.forEach(i =>
                    Award.create({
                        value: i.value,
                        heroId: hero.id
                    })
                )
            }

            if (poem) {
                poem = JSON.parse(poem)
                poem.forEach(i =>
                    Poem.create({
                        value: i.value,
                        heroId: hero.id
                    })
                )
            }

            return res.json(hero)
        }catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res) {
        let heroes = await Hero.findAll();
        return res.json(heroes)
    }
    async getCount(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = Number(limit) ||  9
        let offset = page * limit - limit
        let heroes = await Hero.findAndCountAll({limit, offset})
        return res.json(heroes)
    }
    async getOne(req, res) {
        const {id} = req.params
        const hero = await Hero.findOne(
            {
                where: {id},
                include: [{model: Paragraph, as: 'paragraph'},
                    {model: Award, as: 'award'},
                    {model: Poem, as: 'poem'}
                ]
            }
        )
        return res.json(hero)
    }
}

module.exports = new HeroController()