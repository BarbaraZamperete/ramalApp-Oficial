const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');

const { Setor, RamalF, Pessoa, RamalV} = require('../models/associations')

router.get("/alocar", async (req,res) => {
    res.render('alocar')
})

module.exports = router;
