let express = require('express')
const { Op } = require('sequelize')
const User = require('../tabele/user')
let router = express.Router()
const Aliment = require("../tabele/aliment")


const checkId = (req, res, next) => {
    if (req.params.id && isNaN(req.params.id)) {
        res.status(400).json({"error" : "wrong input for id"})  
    } else {
        next();
    }
}

router.route('/users/:userId/aliment').get(async (req, res) => {  //aici nu se afiseaza alimentele userilor.
    try {
        const user = await User.findAll(req.params.userId, {
            include: [Aliment]
        })
        if (user){
            res.status(200).json(user.Alimente)
        } else {
            res.status(404).json({ error: `User with id ${req.params.userId} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})


router.route('/users/:userId/aliment').post(async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if (user){
            const newAliment = new Aliment(req.body) 
            newAliment.UserId = user.id;
            await newAliment.save();
            res.status(200).json({"message": "aliment adaugat!"})
        } else {
            res.status(404).json({ error: `User with id ${req.params.Id} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})


router.route('/getAliment/:id').get(checkId, async (req, res) => {
    try {
        const aliment = await Aliment.findByPk(req.params.id);
        if (aliment){
            res.status(200).json(aliment);
        } else {
            res.status(404).json({ error: `Aliment with id ${req.params.id} not found!`})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


router.route('/deleteAliment/:id').delete((req, res) => {
    try {
        Aliment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((rows)=> {
            if (rows  === 1){
                res.status(200).json({ status: "aliment deleted!"})
            } else {
                res.status(202).json({ status: "aliment does not exists!"})
            }
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

router.route('/users/:userId/aliment/:alimentId').put(async (req, res) => { //asta merge dar nush ce face
    try {
        const user = await User.findByPk(req.params.userId)
        if (user){
            const alimente = await user.getAlimente({id : req.params.alimentId})
            let aliment = alimente.shift();
            if (aliment){
               aliment = await aliment.update(req.body);
            }
            res.status(200).json(aliment)
        } else {
            res.status(404).json({ error: `User with id ${req.params.userId} not found!`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router;