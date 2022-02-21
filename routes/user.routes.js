const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');

const { Setor, RamalF, Pessoa, RamalV} = require('../models/associations')


router.get("/add-user", (req, res) => {
    res.render('add-user')
})

router.get("/login", (req,res) => {
    res.render('login')
})


module.exports = router;
