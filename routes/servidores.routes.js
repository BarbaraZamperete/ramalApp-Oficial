const {
    Router
} = require('express');
const router = Router();
const sequelize = require('sequelize');
const {listaSetores} = require("../controllers/setorQuery.controller")
const { addServidor } = require("../controllers/servidores.controler");
const Servidor = require('../models/Servidor');



router.get("/search-servidor", async (req, res) => {
    const allServidores = await Servidor.findAll()
    const servidorList = []
    allServidores.forEach((servidor)=> {
        if(servidor.dataValues.matricula != "0000000")
        servidorList.push(servidor.dataValues)
    })
    res.render('servidores/servidores-consulta', {servidorList})
})


router.get("/add-servidor", async (req, res) => {
    const setores = await listaSetores()
    res.render('servidores/add-servidores', {setores})
})
router.post("/add-servidor", async (req, res) => {
    const { nome, matricula, cargo, nomeSetor, chefia } = req.body;
    
    const adicionar = await addServidor(nome, matricula, cargo, nomeSetor, chefia)
    console.log(adicionar)
    res.redirect("/add-servidor");
})


module.exports = router;
